export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const body = await readBody(event)
  const db = useDb()

  if (!body.image || !body.title || !body.info) {
    return createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const linkText = body.links && body.links.length > 0 ? body.links[0].text : null
  const linkUrl = body.links && body.links.length > 0 ? body.links[0].url : null

  await db.execute({
    sql: 'INSERT INTO blog (image, title, info, link_text, link_url) VALUES (?, ?, ?, ?, ?)',
    args: [body.image, body.title, body.info, linkText, linkUrl]
  })

  return { success: true }
})
