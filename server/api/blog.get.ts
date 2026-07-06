export default defineEventHandler(async () => {
  const db = useDb()
  try {
    const result = await db.execute('SELECT * FROM blog ORDER BY sort_order ASC, id DESC')
    return result.rows.map(row => {
      let links = []
      // New: links stored as JSON in `links` column
      if (row.links) {
        try { links = JSON.parse(row.links as string) } catch {}
      }
      // Fallback: old single link columns
      if (links.length === 0 && row.link_text && row.link_url) {
        links = [{ text: row.link_text, url: row.link_url }]
      }
      return {
        id: row.id,
        image: row.image,
        title: row.title,
        info: row.info,
        links
      }
    })
  } catch (e: any) {
    if (e.message.includes('no such table')) {
      return [] // Return empty array if table doesn't exist yet
    }
    throw createError({ statusCode: 500, message: e.message })
  }
})
