import { response } from '@/util/backend'
import { NextRequest } from 'next/server'
import dbQuery from '@/config/mysql/db'
import { ConfigPlayer } from '@/types/databaseType'

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams
  const purview = query.get('purview') as string
  const kleiId = query.get('kleiId') as string
  const page = Number(query.get('page') as string)
  const sql = `SELECT * FROM player WHERE klei_id like "%${kleiId}%" ${
    purview ? 'AND purview = ?' : ''
  }`
  const playerList = (await dbQuery(sql, [[[purview]]])) as Array<ConfigPlayer>
  const start = (page - 1) * 10
  const data = {
    playerList: playerList.slice(start, start + 10),
    total: playerList.length,
  }
  return response(200, 200, data)
}

export const POST = async (request: NextRequest) => {
  const { kleiId, purview } = await request.json()
  let sql = 'SELECT * FROM player WHERE klei_id = ?'
  const playerList = (await dbQuery(sql, [[[kleiId]]])) as Array<ConfigPlayer>
  if (playerList.length > 0) return response(200, 400, false, '用户已存在')
  sql =
    'INSERT INTO player (klei_id, purview, create_time, update_time) VALUES ?'
  const dataNow = Math.round(Number(new Date()) / 1000)
  await dbQuery(sql, [[[kleiId, purview, dataNow, dataNow]]])
  return response(200, 200, true)
}

export const PUT = async (request: NextRequest) => {
  const { id, kleiId, purview } = await request.json()
  const sql =
    'UPDATE player SET klei_id = ?, purview = ?, update_time = ? WHERE id = ?'
  const dataNow = Math.round(Number(new Date()) / 1000)
  await dbQuery(sql, [kleiId, purview, dataNow, id])
  return response(200, 200, true)
}

export const DELETE = async (request: NextRequest) => {
  const { id } = await request.json()
  const sql = 'DELETE FROM player WHERE id = ?'
  await dbQuery(sql, [id])
  return response(200, 200, true)
}
