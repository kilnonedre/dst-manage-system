import { response } from '@/util/backend'
import fs from 'fs'
import { iniToObj } from '@/util/ini'

export const GET = () => {
  const filePath =
    'E:/Nextjs/dst-manage-system/src/file/myDediServer/cluster.ini'
  const data = fs.readFileSync(filePath, 'utf-8')
  const iniObj = iniToObj(data)
  return response(200, 200, iniObj)
}
