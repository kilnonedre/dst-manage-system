import { response } from '@/util/backend'
import { ConfigUser } from '@/types/databaseType.d'
import dbQuery from '@/config/mysql/db'

export const POST = async (request: Request) => {
  const { email, password } = await request.json()
  let sql = 'SELECT * FROM user WHERE email = ?'
  const userList = (await dbQuery(sql, [[[email]]])) as Array<ConfigUser>
  if (userList.length > 0) return response(200, 400, false, '邮箱重复')
  sql = 'INSERT INTO user (email, password, create_time, update_time) VALUES ?'
  const dataNow = Math.round(Number(new Date()) / 1000)
  await dbQuery(sql, [[[email, password, dataNow, dataNow]]])
  return response(200, 200, true)
}
