import { response } from '@/util/backend'
import types from './databaseType.d'
import tableList from '@/config/mysql/table.json'
import query from '@/config/mysql/db'

let tableArr: Array<string> = []

export const GET = async () => {
  const sql =
    'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = "dst_manage_system"'
  const data = (await query(sql, [])) as Array<types.ConfigTable>
  const format = data.map(item => {
    return item.TABLE_NAME
  })
  tableArr = format
  const isSame = tableList.length === tableArr.length
  const msg = `${isSame ? '不' : ''}需要对表进行修改`
  return response(200, 200, isSame, msg)
}

export const POST = async () => {
  try {
    await Promise.all(
      tableList.map(table => {
        const declare: Array<string> = []
        for (const key in table.data) {
          const isPrimaryKey = key === table.primaryKey
          declare.push(
            `${key} ${table.data[key as types.ConfigKey]} ${
              isPrimaryKey ? 'PRIMARY KEY AUTO_INCREMENT' : ''
            }`
          )
        }
        const sql = `CREATE TABLE ${table.name} (${declare.join(',')})`
        return query(sql, [])
      })
    )
    return response(200, 200, '')
  } catch (error) {
    return response(200, 400, '', (error as types.ConfigError).sqlMessage)
  }
}
