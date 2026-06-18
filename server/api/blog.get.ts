export default defineEventHandler(async () => {
  const db = useDb()
  try {
    const result = await db.execute('SELECT * FROM blog ORDER BY sort_order ASC, id DESC')
    // Map link back to array format for frontend
    return result.rows.map(row => ({
      id: row.id,
      image: row.image,
      title: row.title,
      info: row.info,
      links: row.link_text && row.link_url ? [{ text: row.link_text, url: row.link_url }] : []
    }))
  } catch (e: any) {
    if (e.message.includes('no such table')) {
      return [] // Return empty array if table doesn't exist yet
    }
    throw createError({ statusCode: 500, message: e.message })
  }
})
