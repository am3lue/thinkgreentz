import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const body = await readBody(event)
  const db = useDb()

  if (!body.participant_name) {
    return createError({ statusCode: 400, message: 'Participant name is required' })
  }

  const code = 'TGTZ-' + crypto.randomBytes(4).toString('hex').toUpperCase()
  const date = body.issue_date || new Date().toISOString().split('T')[0]

  await db.execute({
    sql: 'INSERT INTO certificates (participant_name, event_name, issue_date, verification_code) VALUES (?, ?, ?, ?)',
    args: [body.participant_name, body.event_name || null, date, code]
  })

  return {
    success: true,
    verification_code: code,
    participant_name: body.participant_name,
    event_name: body.event_name || null,
    issue_date: date,
    verification_url: `https://thinkgreentz.vercel.app/verify?code=${code}`
  }
})
