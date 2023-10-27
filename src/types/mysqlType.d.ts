interface ConfigError {
  code: string
  errno: number
  sqlMessage: string
  sqlState: string
  index: number
  sql: string
}

export { ConfigError }
