export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const body = await readBody(event)
  const db = useDb()

  if (!body.image || !body.title || !body.info) {
    return createError({ statusCode: 400, message: 'Missing required fields' })
  }

  await db.execute({
    sql: 'INSERT INTO programs (image, title, info) VALUES (?, ?, ?)',
    args: [body.image, body.title, body.info]
  })

  return { success: true }
})
