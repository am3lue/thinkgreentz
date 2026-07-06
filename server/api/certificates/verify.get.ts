export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const db = useDb()

  if (!query.code) {
    return createError({ statusCode: 400, message: 'Verification code is required' })
  }

  try {
    const result = await db.execute({
      sql: 'SELECT * FROM certificates WHERE verification_code = ?',
      args: [query.code]
    })

    if (result.rows.length === 0) {
      return { valid: false, message: 'Certificate not found' }
    }

    const cert = result.rows[0]
    return {
      valid: true,
      participant_name: cert.participant_name,
      event_name: cert.event_name,
      issue_date: cert.issue_date,
      verification_code: cert.verification_code,
      created_at: cert.created_at
    }
  } catch (e: any) {
    if (e.message.includes('no such table')) {
      return { valid: false, message: 'No certificates have been issued yet' }
    }
    throw createError({ statusCode: 500, message: e.message })
  }
})
