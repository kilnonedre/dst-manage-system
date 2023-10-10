type ConfigKey = 'file' | 'action'

type ConfigColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

interface ConfigRow {
  file: string
}

export { ConfigRow, ConfigKey, ConfigColor }
