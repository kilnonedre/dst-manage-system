interface ConfigUser {
  id: number
  email: string
  password: string
  create_time: number
  update_time: number
}

interface ConfigPlayer {
  id: number
  klei_id: string
  purview: string
  create_time: number
  update_time: number
}

interface ConfigCount {
  'COUNT(*)': number
}

export { ConfigUser, ConfigPlayer, ConfigCount }
