import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

const EXCEL_FILE_PATH = path.join(process.cwd(), 'novelleyx_users_db.xlsx');

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Prepare row data
    const newRow = {
      Id: Date.now().toString(),
      AccountType: data.accountType || 'B2B',
      Email: data.email,
      Name: data.name,
      Phone: data.phone || 'N/A',
      Company: data.company || 'N/A',
      Industry: data.industry || 'N/A',
      Role: data.role || 'N/A',
      RegistrationDate: new Date().toISOString()
      // Note: Never store plain text passwords in a real DB. We will omit it for safety in this Excel mock DB.
    };

    let workbook;
    let worksheet;

    // 2. Read or Create Excel file
    if (fs.existsSync(EXCEL_FILE_PATH)) {
      workbook = XLSX.readFile(EXCEL_FILE_PATH);
      worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const existingData = XLSX.utils.sheet_to_json(worksheet);
      
      // Check if user already exists
      const userExists = existingData.some((row: any) => row.Email === data.email);
      if (userExists) {
        return NextResponse.json({ error: 'User with this email already exists in DB.' }, { status: 400 });
      }

      existingData.push(newRow);
      worksheet = XLSX.utils.json_to_sheet(existingData);
      workbook.Sheets[workbook.SheetNames[0]] = worksheet;
    } else {
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.json_to_sheet([newRow]);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    }

    // 3. Write Excel file
    XLSX.writeFile(workbook, EXCEL_FILE_PATH);

    return NextResponse.json({ success: true, message: 'User registered in Excel DB successfully.', user: newRow });
  } catch (error) {
    console.error('Excel DB Error:', error);
    return NextResponse.json({ error: 'Failed to write to Excel DB' }, { status: 500 });
  }
}
