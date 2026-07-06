export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = useDb()

  if (!body.fullName || !body.email) {
    return createError({ statusCode: 400, message: 'Name and email are required' })
  }

  await db.execute({
    sql: `INSERT INTO volunteer_applications
      (full_name, dob, location, email, phone, availability, interests, skills, languages, motivation, emergency_contact, health_info)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      body.fullName,
      body.dob || null,
      body.location || null,
      body.email,
      body.phone || null,
      body.availability || null,
      body.interests ? JSON.stringify(body.interests) : null,
      body.skills || null,
      body.languages ? JSON.stringify(body.languages) : null,
      body.motivation || null,
      body.emergencyContact || null,
      body.healthInfo || null
    ]
  })

  return { success: true, message: 'Application received!' }
})
