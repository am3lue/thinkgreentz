export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = useDb()

  if (!body.name || !body.email || !body.message) {
    return createError({ statusCode: 400, message: 'Name, email, and message are required' })
  }

  // ──────────────────────────────────────────────────────────────
  // TODO: Send email notification
  // When SMTP credentials are configured in .env, uncomment the
  // mail utility below to forward submissions to ilakizar@gmail.com.
  //
  //   import { sendContactNotification } from '~/server/utils/mail'
  //   await sendContactNotification({ name, email, message })
  //
  // See server/utils/mail.ts for the placeholder implementation.
  // ──────────────────────────────────────────────────────────────

  await db.execute({
    sql: 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
    args: [body.name, body.email, body.message]
  })

  return { success: true, message: 'Message received! We\'ll be in touch soon.' }
})
