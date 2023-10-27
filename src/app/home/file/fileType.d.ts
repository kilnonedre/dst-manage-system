type ConfigFilename = 'master' | 'masterMod' | 'caves' | 'cavesMod'

interface ConfigFile {
  master: string
  masterMod: string
  caves: string
  cavesMod: string
}

export { ConfigFile, ConfigFilename }
