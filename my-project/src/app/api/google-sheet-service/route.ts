import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Only POST requests are allowed" });
  }

  const body = await req.json();
  console.log(body);
  const GOOGLE_PRIVATE_KEY =
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIr19KiudWtzR8\nj3Kv86KiGztE+Aov9Hv/KIddcmGjACTt37IA6ZKj4vDRlRxFeHso3JbWCiB7EAaW\nD2q8xLqtWQJjWhT8mvqK3b07W+UTTK6an8dON/jKZdhDWekTcKbFSW3HP5DbxaCA\naFQUg+2dlj58nL1gChEPXHvpFvyNvHf/pE5JQssjjrfmOZPO0XsAMbEMfQZgoNn3\n9f9465bKOOc2+xNW7ElSywa4c20lX9/ART8ElF2em703zLnK6zXJROcgekoXySZj\nYzM7OVkMMWG8nV0xk57s/AxKvSIb01sIC5zwp8fHjHnb0CeoHhL+FuuSZtNIySt6\n5pJcWvlRAgMBAAECggEAYqzYTe6+kQTD6fseiSVichKxsdfEKpAr5+olpOz41Qzd\nG5lCDPDMCYksn+CRZhc3d3//Kn8QOXJHysEJ2odgwpthcTh52Trati0RPn6QxEyQ\nDbdCaFNdISeyjmtHDyf02EyijbXTpDwoDvs9XFkCHNojH2JyOya3/LWct591zrpd\nu3QzTUWrrpnSb0UhCMnRU98xV4iT3ZbtcfUcEMZx+ccA63sVQbo42Rj51llQjMS6\nuMOFzOAgDVX/RkUaiysMo0mNVUAe4y+ojlqJ1V7DKPrLxaDKAk802/7oCvxD5XHM\nJ5AZtY82F6B3SD/+GACIL8xmrgFKAyGnqZsIf4dRgQKBgQDq+QrlUkwPnlVvtpie\ntNMzDTvLgynKkAkJXuVpUsFx0U8J5hEt5h3ua34X7DAAESbA4LFkbr+a9v1vfiTa\ngerrMew8/zFwKJT2eznLKnBS1QP1H57fU7FCGVLpfkxf4ONxOy7S0ZwV5a10Tvuo\noMHKNMMSGAnDlwVTuB9eo6GwgwKBgQDapNYNLe5mMgzJAOtQgqVZw0pBo03N8U09\nloCWGjJB86F0LRmvEBRPDk8SA0buLLalYDogHIVXREwXGPQhwvuGukCixGMhWBTT\nIdhfS7I0Kv24XhoT1QpYaoK3cGDg+jFcwrkwRd7cB1EMWEaXPkh0IN66wwHcDXIm\n/Pkjv7demwKBgQC07WSdZXwZvqIsrd3gvn2tXrA/KVThm3zJ0V82dTlsyW1hwtxR\nilJbxjtGcmAXfR1pANq26avxx+MnmWsJMWZRCZTM9vb7VNQ24nWC4b+xmEI+2cU8\nUzY3HkbAcbafUQvwoVCRlkLofXzNBRA0LOxrJata4FWMXFoGt8y306lpvwKBgHTF\nHhCR3EW2Kz/aftJTw+1psCnYBoCbg84FqA0CVp8Ed9DtGU92vfHuyWnsWCBxvuYZ\nu1FVCh2uOxkG2bOCSAUPSd/kFLFFMnIEHGPgsH7OCw1BLJo06D6KO9+uY/8jf+Nz\nl6XhWwGV4sI+Dw1NVTK4L1v9M+wLPlD2QDTIei1LAoGBALpnmsPWGLWqPDkm6jiG\nxec7FJBGBupHIVrkN8lyV2Yj9QfkYVHg2qhlYjBbM2efZr7KKAn6/uYMI6s5CwQA\nL95zwhiStdNMgpJU5xxxMEvYjEJ4MY2yE28lA3z4hISgLHFZXc8CedpQ6qQAYKhC\n3Fyj3YzNTkQyztSsp82DjIck\n-----END PRIVATE KEY-----\n";

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
