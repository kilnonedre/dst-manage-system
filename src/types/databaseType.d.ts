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

interface ConfigCluster {
  id: number
  master: string
  masterMod: string
  caves: string
  cavesMod: string
  create_time: number
  update_time: number
}

export { ConfigUser, ConfigPlayer, ConfigCluster }
