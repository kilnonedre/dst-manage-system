import { response, tryRes } from '@/util/backend'
import { ConfigUser } from '@/types/databaseType.d'
import dbQuery from '@/config/mysql/db'
import { ConfigGetParams } from './registerType.d'

const postFun = async ({ email, password }: ConfigGetParams) => {
  let sql = 'SELECT * FROM user WHERE email = ?'
  const userList = (await dbQuery(sql, [[[email]]])) as Array<ConfigUser>
  if (userList.length > 0) throw new Error('邮箱重复')
  sql = 'INSERT INTO user (email, password, create_time, update_time) VALUES ?'
  const dataNow = Math.round(Number(new Date()) / 1000)
  await dbQuery(sql, [[[email, password, dataNow, dataNow]]])
  return true
}

export const POST = async (request: Request) => {
  const req = await request.json()
  const { isSuccess, error } = await tryRes(postFun, req)
  if (isSuccess) return response(200, 200, true)
  return response(200, 400, false, error.message)
}
