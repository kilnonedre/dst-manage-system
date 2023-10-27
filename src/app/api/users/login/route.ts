import { response, tryRes } from '@/util/backend'
import { ConfigUser } from '@/types/databaseType.d'
import { ConfigPostParams } from './loginType.d'
import dbQuery from '@/config/mysql/db'

const postFun = async ({ email, password }: ConfigPostParams) => {
  const sql = 'SELECT * FROM user WHERE email = ?'
  const userList = (await dbQuery(sql, [[[email]]])) as Array<ConfigUser>
  if (userList.length === 0) throw new Error('用户不存在')
  if (userList[0].password !== password) throw new Error('密码不正确')
  return true
}

export const POST = async (request: Request) => {
  const req = await request.json()
  const { isSuccess, error } = await tryRes(postFun, req)
  if (isSuccess) return response(200, 200, true)
  return response(200, 200, false, error.message)
}
