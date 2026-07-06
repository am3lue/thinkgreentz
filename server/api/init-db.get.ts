export default defineEventHandler(async (event) => {
  const db = useDb()

  try {
    // 1. Core tables
    await db.execute(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT NOT NULL,
        alt TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await db.execute(`
      CREATE TABLE IF NOT EXISTS blog (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT NOT NULL,
        title TEXT NOT NULL,
        info TEXT NOT NULL,
        link_text TEXT,
        link_url TEXT,
        links TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await db.execute(`
      CREATE TABLE IF NOT EXISTS programs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT NOT NULL,
        title TEXT NOT NULL,
        info TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await db.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        link_url TEXT,
        start_time DATETIME NOT NULL,
        end_time DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Admin tables
    await db.execute(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_salt TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await db.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        admin_id INTEGER NOT NULL,
        expires_at DATETIME NOT NULL,
        FOREIGN KEY(admin_id) REFERENCES admins(id)
      )
    `)

    // Attempt to add columns to existing tables (safe migrations)
    try { await db.execute('ALTER TABLE gallery ADD COLUMN sort_order INTEGER DEFAULT 0') } catch (e) {}
    try { await db.execute('ALTER TABLE blog ADD COLUMN sort_order INTEGER DEFAULT 0') } catch (e) {}
    try { await db.execute("ALTER TABLE blog ADD COLUMN links TEXT DEFAULT '[]'") } catch (e) {}

    // Form submission tables
    await db.execute(`
      CREATE TABLE IF NOT EXISTS volunteer_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        dob TEXT,
        location TEXT,
        email TEXT NOT NULL,
        phone TEXT,
        availability TEXT,
        interests TEXT,
        skills TEXT,
        languages TEXT,
        motivation TEXT,
        emergency_contact TEXT,
        health_info TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await db.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Certificates table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS certificates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        participant_name TEXT NOT NULL,
        event_name TEXT,
        issue_date TEXT NOT NULL,
        verification_code TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Check if any admins exist
    const adminsCount = await db.execute('SELECT COUNT(*) as count FROM admins')
    if (adminsCount.rows[0].count === 0) {
      const { salt, hash } = hashPassword('admin123')
      await db.execute({
        sql: 'INSERT INTO admins (username, password_salt, password_hash) VALUES (?, ?, ?)',
        args: ['admin', salt, hash]
      })
    }

    return { message: 'Database tables initialized successfully! Default login is admin / admin123' }
  } catch (e: any) {
    return createError({
      statusCode: 500,
      message: e.message
    })
  }
})
