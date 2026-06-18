export default defineEventHandler(async () => {
  const db = useDb()
  try {
    const result = await db.execute('SELECT * FROM programs ORDER BY sort_order ASC, id DESC')
    return result.rows
  } catch (e: any) {
    if (e.message.includes('no such table')) {
      return []
    }
    throw createError({ statusCode: 500, message: e.message })
  }
})
