// export interface UserProps {
//   city: string;
//   createdAt: string;
//   email: string;
//   github: string;
//   group: string;
//   language: string;
//   linkedin: string;
//   motive: string;
//   name: string;
//   phone: string;
//   resume: string;
//   telegram: string;
//   type: string;
// }

// export async function sendGoogleTable(user: {
//   [p: string]: any;
//   createdAt: string;
// }) {
//   const res = await fetch("api/google-sheet-service", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json; charset=UTF-8",
//     },
//     body: JSON.stringify(user),
//   });

//   return res.json();
// }

// export async function postMail(
//   name: string,
//   email: string,
//   text: string
// ): Promise<Response> {
//   return await fetch("api/sendMail", {
//     method: "POST",
//     headers: {
//       Accept: "application/json, text/plain, */*",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name,
//       email,
//       text,
//     }),
//   });
// }

// export async function sendUserToTelegramBot(data: {
//   [p: string]: any;
//   createdAt: string;
// }) {
//   const res = await fetch("api/tlg", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json; charset=UTF-8",
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// }
