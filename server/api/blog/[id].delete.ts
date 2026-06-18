export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const id = getRouterParam(event, 'id')
  const db = useDb()

  if (!id) {
    return createError({ statusCode: 400, message: 'Missing ID' })
  }

  await db.execute({
    sql: 'DELETE FROM blog WHERE id = ?',
    args: [id]
  })

  return { success: true }
})
