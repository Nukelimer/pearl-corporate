// import { contactSchema } from "@/app/lib/contactSchema";
// import sendgrid from "@sendgrid/mail";

// sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

// export async function POST(req: Request) {
//   try {
//     const json = await req.json();
//     const data = contactSchema.parse(json); // 🔥 server-side validation

//     await sendgrid.send({
//       to: "your@email.com",
//       from: data.email,
//       subject: `[CONTACT] ${data.subject}`,
//       html: `
//         <p><strong>Name:</strong> ${data.name}</p>
//         <p><strong>Email:</strong> ${data.email}</p>
//         <p><strong>Message:</strong><br />${data.message}</p>
//       `,
//     });

//     return Response.json({ success: true });
//   } catch (err) {
//     return Response.json(
//       { error: "Invalid or failed request" },
//       { status: 400 }
//     );
//   }
// }
