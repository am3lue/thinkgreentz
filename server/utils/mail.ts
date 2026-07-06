// ──────────────────────────────────────────────────────────────
// Mail Utility — Placeholder for future email integration
// ──────────────────────────────────────────────────────────────
// When you're ready to send email notifications for contact form
// submissions and volunteer applications, configure SMTP in .env:
//
//   SMTP_HOST="smtp.gmail.com"
//   SMTP_PORT=587
//   SMTP_USER="ilakizar@gmail.com"
//   SMTP_PASS="your-gmail-app-password"
//
// Then install nodemailer:
//   npm install nodemailer
//   npm install -D @types/nodemailer
//
// Uncomment and use the functions below in your API handlers.
// ──────────────────────────────────────────────────────────────

// import nodemailer from 'nodemailer'
//
// function getMailer() {
//   const config = useRuntimeConfig()
//   return nodemailer.createTransport({
//     host: process.env.SMTP_HOST || 'smtp.gmail.com',
//     port: Number(process.env.SMTP_PORT) || 587,
//     secure: false,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   })
// }
//
// export async function sendContactNotification(data: {
//   name: string
//   email: string
//   message: string
// }) {
//   const transporter = getMailer()
//   await transporter.sendMail({
//     from: `"Think Green Website" <${process.env.SMTP_USER}>`,
//     to: 'ilakizar@gmail.com',
//     subject: `New contact message from ${data.name}`,
//     text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
//     replyTo: data.email,
//   })
// }
//
// export async function sendVolunteerNotification(data: {
//   fullName: string
//   email: string
//   phone?: string
// }) {
//   const transporter = getMailer()
//   await transporter.sendMail({
//     from: `"Think Green Website" <${process.env.SMTP_USER}>`,
//     to: 'ilakizar@gmail.com',
//     subject: `New volunteer application from ${data.fullName}`,
//     text: `Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}`,
//   })
// }

export {}
