import { createClient } from '@libsql/client'

export function useDb() {
  const config = useRuntimeConfig()
  
  if (!config.tursoUrl || !config.tursoApiKey) {
    throw new Error('Missing Turso database credentials')
  }

  return createClient({
    url: config.tursoUrl,
    authToken: config.tursoApiKey
  })
}
