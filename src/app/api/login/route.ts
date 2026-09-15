import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

const EXCEL_FILE_PATH = path.join(process.cwd(), 'novelleyx_users_db.xlsx');

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Handle preset demo accounts
    if (email === 'admin@novelleyx.demo' && password === 'NOVELLEYX2026') {
      return NextResponse.json({ 
        success: true, 
        user: { id: 'admin-1', name: 'Founder & CEO', email, role: 'ADMIN', company: 'NOVELLEYX Core', industry: 'Technology & AI' } 
      });
    }

    if (email === 'client@test.com' && password === 'password123') {
      return NextResponse.json({ 
        success: true, 
        user: { id: 'client-1', name: 'Acme Enterprise Partner', email, role: 'LEAD', company: 'Acme Global Corp', industry: 'Enterprise IT' } 
      });
    }

    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      return NextResponse.json({ error: 'User not found. Please register an account.' }, { status: 404 });
    }

    const workbook = XLSX.readFile(EXCEL_FILE_PATH);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const existingData = XLSX.utils.sheet_to_json(worksheet);

    const user: any = existingData.find((row: any) => row.Email === email);

    if (user) {
      return NextResponse.json({ 
        success: true, 
        user: { 
          id: user.Id, 
          name: user.Name, 
          email: user.Email, 
          role: user.Role || 'LEAD',
          company: user.Company,
          industry: user.Industry
        } 
      });
    }

    return NextResponse.json({ error: 'User not found in DB.' }, { status: 404 });

  } catch (error) {
    console.error('Login DB Error:', error);
    return NextResponse.json({ error: 'Failed to access DB' }, { status: 500 });
  }
}
