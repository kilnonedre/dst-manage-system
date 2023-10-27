import { response, tryRes } from '@/util/backend'
import fs from 'fs'
import { iniToObj } from '@/util/ini'

const getFun = async () => {
  const filePath =
    'E:/Nextjs/dst-manage-system/src/file/myDediServer/cluster.ini'
  const data = fs.readFileSync(filePath, 'utf-8')
  const iniObj = iniToObj(data)
  return iniObj
}

export const GET = async () => {
  const { isSuccess, data, error } = await tryRes(getFun)
  if (isSuccess) return response(200, 200, data)
  return response(200, 400, false, error.message)
}
