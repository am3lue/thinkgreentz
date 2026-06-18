export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_session')
  if (token) {
    const db = useDb()
    await db.execute({
      sql: 'DELETE FROM sessions WHERE token = ?',
      args: [token]
    })
  }
  
  deleteCookie(event, 'admin_session', { path: '/' })
  return { success: true }
})
