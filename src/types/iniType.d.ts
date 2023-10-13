interface ConfigMainConfig {
  GAMEPLAY: {
    game_mode: string
    max_players: number
    pvp: boolean
    pause_when_empty: boolean
  }
  NETWORK: {
    cluster_description: string
    cluster_name: string
    cluster_password: string
  }
  MISC: {
    console_enabled: boolean
  }
  SHARD: {
    shard_enabled: boolean
    bind_ip: string
    master_ip: string
    master_port: number
    cluster_key: string
  }
}

export { ConfigMainConfig }
