import { ConfigPlayer } from '@/app/home/purview/purviewType'

interface ConfigProps {
  isOpen: boolean
  onOpen: function
  onOpenChange: function
  reRender: function
  title: string
  player: ConfigPlayer | null
}

interface ConfigParams {
  id?: number
  kleiId: string
  purview: string
}

export { ConfigProps, ConfigParams }
