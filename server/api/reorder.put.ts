export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const body = await readBody(event) 
  // Expects { table: 'blog', items: [{id: 1, sort_order: 0}, {id: 2, sort_order: 1}] }

  if (!body.table || !body.items || !Array.isArray(body.items)) {
    return createError({ statusCode: 400, message: 'Invalid data' })
  }

  const allowedTables = ['blog', 'gallery', 'programs']
  if (!allowedTables.includes(body.table)) {
    return createError({ statusCode: 400, message: 'Invalid table' })
  }

  const db = useDb()

  try {
    for (const item of body.items) {
      await db.execute({
        sql: `UPDATE ${body.table} SET sort_order = ? WHERE id = ?`,
        args: [item.sort_order, item.id]
      })
    }
    return { success: true }
  } catch (e: any) {
    return createError({ statusCode: 500, message: e.message })
  }
})
