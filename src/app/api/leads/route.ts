import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as xlsx from 'xlsx';

const EXCEL_FILE_PATH = path.join(process.cwd(), 'novelleyx_crm_db.xlsx');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, phone, company, service } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const newLead = {
      LeadID: `L-${Date.now()}`,
      Name: name,
      Email: email,
      Phone: phone || 'N/A',
      Company: company || 'N/A',
      Service: service || 'General Inquiry',
      Message: message || '',
      Status: 'NEW',
      AI_Summary: 'Pending analysis',
      AI_Confidence: '',
      DateCreated: new Date().toISOString()
    };

    let workbook;
    let leadsSheet;
    let existingLeads: any[] = [];

    if (fs.existsSync(EXCEL_FILE_PATH)) {
      workbook = xlsx.readFile(EXCEL_FILE_PATH);
      if (workbook.SheetNames.includes('Leads')) {
        leadsSheet = workbook.Sheets['Leads'];
        existingLeads = xlsx.utils.sheet_to_json(leadsSheet);
      } else {
        workbook.SheetNames.push('Leads');
      }
    } else {
      workbook = xlsx.utils.book_new();
    }

    existingLeads.push(newLead);
    
    const newSheet = xlsx.utils.json_to_sheet(existingLeads);
    workbook.Sheets['Leads'] = newSheet;

    if (!workbook.SheetNames.includes('Leads')) {
      xlsx.utils.book_append_sheet(workbook, newSheet, 'Leads');
    }

    xlsx.writeFile(workbook, EXCEL_FILE_PATH);

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error: any) {
    console.error('Lead Registration Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      return NextResponse.json({ leads: [] }, { status: 200 });
    }

    const workbook = xlsx.readFile(EXCEL_FILE_PATH);
    if (!workbook.SheetNames.includes('Leads')) {
      return NextResponse.json({ leads: [] }, { status: 200 });
    }

    const leadsSheet = workbook.Sheets['Leads'];
    const leads = xlsx.utils.sheet_to_json(leadsSheet);

    return NextResponse.json({ leads }, { status: 200 });
  } catch (error: any) {
    console.error('Lead Read Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
