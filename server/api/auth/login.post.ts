import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.username || !body.password) {
    throw createError({ statusCode: 400, message: 'Missing credentials' })
  }

  const db = useDb()
  const result = await db.execute({
    sql: 'SELECT id, password_salt, password_hash FROM admins WHERE username = ?',
    args: [body.username]
  })

  if (result.rows.length === 0) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  const admin = result.rows[0]
  const isValid = verifyPassword(body.password, admin.password_salt as string, admin.password_hash as string)

  if (!isValid) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  // Generate session token
  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await db.execute({
    sql: 'INSERT INTO sessions (token, admin_id, expires_at) VALUES (?, ?, ?)',
    args: [token, admin.id, expiresAt.toISOString()]
  })

  setCookie(event, 'admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/'
  })

  return { success: true }
})
