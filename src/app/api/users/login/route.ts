import { response } from '@/util/backend'
import { ConfigUser } from '@/types/databaseType'
import query from '@/config/mysql/db'

export const POST = async (request: Request) => {
  const { email, password } = await request.json()
  const sql = 'SELECT * FROM user WHERE email = ?'
  const userList = (await query(sql, [[[email]]])) as Array<ConfigUser>
  if (userList.length === 0) return response(200, 400, false, '用户不存在')
  if (userList[0].password !== password)
    return response(200, 400, false, '密码不正确')
  return response(200, 200, true)
}
