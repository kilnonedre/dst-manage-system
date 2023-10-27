import { response } from '@/util/backend'
import { NextRequest } from 'next/server'
import dbQuery from '@/config/mysql/db'
import { ConfigCluster } from '@/types/databaseType'

export const GET = async () => {
  const sql = 'SELECT * FROM cluster'
  const clusterList = (await dbQuery(sql)) as Array<ConfigCluster>
  return response(200, 200, clusterList[0])
}

export const POST = async (request: NextRequest) => {
  const { master, masterMod, caves, cavesMod } = await request.json()
  const sql =
    'INSERT INTO cluster (master, masterMod, caves, cavesMod, create_time, update_time) VALUES ?'
  const dataNow = Math.round(Number(new Date()) / 1000)
  await dbQuery(sql, [[[master, masterMod, caves, cavesMod, dataNow, dataNow]]])
  return response(200, 200, true)
}
