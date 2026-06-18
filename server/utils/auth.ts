import crypto from 'crypto'

export function hashPassword(password: string, salt: string = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return { salt, hash }
}

export function verifyPassword(password: string, salt: string, hash: string) {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return verifyHash === hash
}

export async function requireAuth(event: any) {
  const sessionToken = getCookie(event, 'admin_session')
  if (!sessionToken) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const db = useDb()
  const result = await db.execute({
    sql: 'SELECT admin_id FROM sessions WHERE token = ? AND expires_at > CURRENT_TIMESTAMP',
    args: [sessionToken]
  })

  if (result.rows.length === 0) {
    throw createError({ statusCode: 401, message: 'Unauthorized or session expired' })
  }

  return result.rows[0].admin_id
}
