export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const body = await readBody(event)
  const db = useDb()

  if (!body.title || !body.description || !body.start_time || !body.end_time) {
    return createError({ statusCode: 400, message: 'Missing required fields' })
  }

  await db.execute({
    sql: 'INSERT INTO events (title, description, link_url, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
    args: [body.title, body.description, body.link_url || null, body.start_time, body.end_time]
  })

  return { success: true }
})
