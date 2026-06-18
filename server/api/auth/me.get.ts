export default defineEventHandler(async (event) => {
  try {
    const adminId = await requireAuth(event)
    const db = useDb()
    const result = await db.execute({
      sql: 'SELECT id, username FROM admins WHERE id = ?',
      args: [adminId]
    })
    if (result.rows.length === 0) throw new Error('Not found')
    
    return { authenticated: true, user: result.rows[0] }
  } catch (e) {
    return { authenticated: false }
  }
})
