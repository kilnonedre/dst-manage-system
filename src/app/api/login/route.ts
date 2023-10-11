import { response } from '@/util/backend'
import query from '@/config/mysql/db'

export const POST = async (request: Request) => {
  const body = await request.json()
  const email = '1600513615@qq.com'
  const sql = 'INSERT INTO admin_login (username) VALUES ?'
  query(sql, [[[email as string]]])
  console.log(body.test)
  return response(200, 200, body)
}
