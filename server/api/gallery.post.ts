export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const body = await readBody(event)
  const db = useDb()

  if (!body.image || !body.alt) {
    return createError({ statusCode: 400, message: 'Missing required fields' })
  }

  await db.execute({
    sql: 'INSERT INTO gallery (image, alt) VALUES (?, ?)',
    args: [body.image, body.alt]
  })

  return { success: true }
})
