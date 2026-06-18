export default defineEventHandler(async () => {
  const db = useDb()
  try {
    const result = await db.execute('SELECT * FROM gallery ORDER BY sort_order ASC, id DESC')
    return result.rows
  } catch (e: any) {
    if (e.message.includes('no such table')) {
      return [] // Return empty array if table doesn't exist yet
    }
    throw createError({ statusCode: 500, message: e.message })
  }
})
