import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Only POST requests are allowed" });
  }

  const body = await req.json();
 
  const GOOGLE_PRIVATE_KEY =
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCygnjhnSJwoy1\nB1TwimeonefqwsXnXtvSE9avFhWF5OdC/dKK8hQCFlemZ7ct8jVdYOF3047nxdwC\nXPtdMKV9k6TTxAzNfV4hwLx1mHCPkqne6Bt9sHdAxIBmruVry43YYD/oIUSPn0jt\nG6O1taqaYtDBXAouBL73C8hAwt92fkV5oK6tEW2xXRJkDFJH35c0krTZafX03m6i\nJzKx1NgvtwIC+hhoWfSvRHP4gAAKboit6mcs5Vu5cbIaResksuyAIU+WaPPSVbVt\nYFPMDZqd6sAAUZIOZ/v7iTpQCl/vvjYkSHG82Qn1sFveodmthGyw/wbxFCJwTaGc\n3XlnGLBdAgMBAAECggEAI3s9c2Q3wKs/Sa9o9brkWGbRCqaJeZSCGqFx+ukdKQtR\n49ZL3nLrmZi7xQxB5fznYxfFYjgXYRkdsxGAWRCGKJp3DPr6cQjr116eBZartD9d\nMYUaktnM0y+oCuxDTpAgyZ/4rB45OKclV8lv1+bcSWyEBaCwGwNSzLno84D7xv+2\nHlS0zFqEulKA3ko/przpUYzZSvgNgasR1vzhwgBLQpxgDL2wtYI+81e2QbULjJLK\nzKx1wdu60q/MlXRkJhMl/cGlUYFP44o97L2hiw6zM/IWyv2yH31SNTMDqytCD5n2\nBt0mg3bGzNY7m9IcFf3MlSlG8cWD0hGD+zHUhqsH4QKBgQDzL44Trn+pFXpRWgbt\np884T/f5Xae4d5DkT+0F8gR6JYv0SxGujQLgOLTQCNB//aDvdxA06LI5CRR/UhDT\nXvCT5ojJdYNk3oRvKS2pEneXHKmI4FpM13kGqQimTdcb3+lgYR1fvLG1B2204/SD\ns8l400VngBsjyQcQPMXyO39G4QKBgQDNDaPn4JalGBv2z3xPU2HVAVNqmo/Ucv3l\nHcZAOTSI41WiOvYUg4qqbbN0v8x3YOVk26oXoBsq1DS/gxNzEBMHp3OQBv0mU9aP\nssfyfZQvcRRLZ4QWz1X8ChLkWMYJ0Obcnh/R5RsWK7QnerUO0frYWoObZeA9iFGN\nQkQ8N1gk/QKBgDdRjgQ0IZ4Y4KY40HKnRaANsN7sywZPTIpjFAvSLeqLN/buTKtk\nME9JFvhryOIUk9NlRi6C8GfBBQShampqoldCjcMmFCmR5JZUy6o2JTYeswIL5v6r\n1UAKm4kZE+GnYbMm5EOu7M29TttjL2/2KdJuXM9aeNH/HLg42t5rYlyBAoGBAK/O\nGxJKRz6C/i7M09q7NazHdzp2DAztDmvq7DfSFA2tQ5VVEfiikzft2Cen7ekIRYUE\npL+ewMwmppbwDbPgO0CbvAPnShIbXWFUugNY0b0fKXRA60oXN7Rg+rOWvSxbVCQg\n2k0+LcwDanFSzntHYtcuO5n3bZu0DZ+cCh7KoKMNAoGBANvhStORaPB8RzbZ6/5Q\njPIjqJ3AwOBYyq12YNjwkY5hIMN2it+3DyWpD+u9jaNpTAYaaHRyveILRzzxliZT\n/tdUiOGAphG5qakHTcDH7ahYS5wN9Uq3HxwZXhr+7GOEbUwiHTI1yL9OsBdog9SN\nezN1scskvWoFt+L+vN2E2UOI\n-----END PRIVATE KEY-----\n";

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "/n"),
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
