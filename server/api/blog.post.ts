export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const body = await readBody(event)
  const db = useDb()

  if (!body.image || !body.title || !body.info) {
    return createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const linksJson = body.links && body.links.length > 0 ? JSON.stringify(body.links) : null

  await db.execute({
    sql: 'INSERT INTO blog (image, title, info, links) VALUES (?, ?, ?, ?)',
    args: [body.image, body.title, body.info, linksJson]
  })

  return { success: true }
})
