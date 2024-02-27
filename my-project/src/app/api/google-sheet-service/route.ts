import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Only POST requests are allowed" });
  }

  const body = await req.json();
  console.log(body);

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "/n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A2:D2",
      valueInputOption: "USER_ENTERED",

      requestBody: {
        values: [
          [
            body?.fullName,
            body?.email,
            body?.phone,
            body?.message,
            body?.createdAt,
          ],
        ],
      },
    });
    return NextResponse.json({ data: response.data });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error: error });
  }
}
