export default defineEventHandler(async () => {
  const db = useDb()
  try {
    // Only fetch events that haven't ended yet, ordered by starting soonest
    const result = await db.execute(`
      SELECT * FROM events 
      WHERE end_time > CURRENT_TIMESTAMP 
      ORDER BY start_time ASC 
      LIMIT 1
    `)
    return result.rows
  } catch (e: any) {
    if (e.message.includes('no such table')) return []
    throw createError({ statusCode: 500, message: e.message })
  }
})
