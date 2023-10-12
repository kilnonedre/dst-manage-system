type ConfigKey = 'id' | 'email' | 'password' | 'create_time' | 'update_time'

interface ConfigTable {
  TABLE_NAME: string
}

interface ConfigError {
  code: string
  errno: number
  sqlMessage: string
  sqlState: string
  index: number
  sql: string
}

export { ConfigKey, ConfigTable, ConfigError }
