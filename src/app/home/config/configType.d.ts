type ConfigMark = 'input' | 'select'

interface ConfigConfig {
  mark: ConfigMark
  label: string
}

export { ConfigConfig, ConfigMark }
