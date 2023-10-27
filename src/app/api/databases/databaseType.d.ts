type ConfigKey = 'id' | 'email' | 'password' | 'create_time' | 'update_time'

interface ConfigTable {
  TABLE_NAME: string
}

export { ConfigKey, ConfigTable }
