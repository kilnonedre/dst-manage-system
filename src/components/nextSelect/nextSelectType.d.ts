type ConfigSize = 'sm' | 'lg' | 'md'

interface ConfigList {
  key: number | string
  value: number | string
}

interface ConfigProps {
  list: Array<ConfigList>
  placeholder: string
  select: function
  size: ConfigSize
  width?: number
  noEmpty?: boolean
  default?: string
}

export { ConfigProps }
