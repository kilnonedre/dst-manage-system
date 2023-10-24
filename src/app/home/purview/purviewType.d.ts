type ConfigTab = 'admin' | 'white' | 'black'

type ConfigKey = 'serial' | 'klei_id' | 'purview' | 'action'

interface ConfigPlayer {
  serial: number
  id: number
  serial: number
  klei_id: string
  purview: string
}

export { ConfigTab, ConfigPlayer, ConfigKey }
