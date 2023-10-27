import { response, tryRes } from '@/util/backend'
import { NextRequest } from 'next/server'
import dbQuery from '@/config/mysql/db'
import { ConfigPlayer } from '@/types/databaseType'
import {
  ConfigGetParams,
  ConfigPostParams,
  ConfigPutParams,
  ConfigDeleteParams,
} from './playerType.d'

const getFun = async ({ purview, kleiId, page }: ConfigGetParams) => {
  const sql = `SELECT * FROM player WHERE klei_id like "%${kleiId}%" ${
    purview ? 'AND purview = ?' : ''
  }`
  const playerList = (await dbQuery(sql, [[[purview]]])) as Array<ConfigPlayer>
  const start = (page - 1) * 10
  const result = {
    playerList: playerList.slice(start, start + 10),
    total: playerList.length,
  }
  return result
}

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams
  const purview = query.get('purview') as string
  const kleiId = query.get('kleiId') as string
  const page = Number(query.get('page') as string)
  const params = {
    purview,
    kleiId,
    page,
  }
  const { isSuccess, data, error } = await tryRes(getFun, params)
  if (isSuccess) return response(200, 200, data)
  return response(200, 400, false, error.message)
}

const postFun = async ({ kleiId, purview }: ConfigPostParams) => {
  let sql = 'SELECT * FROM player WHERE klei_id = ?'
  const playerList = (await dbQuery(sql, [[[kleiId]]])) as Array<ConfigPlayer>
  if (playerList.length > 0) throw new Error('用户已存在')
  sql =
    'INSERT INTO player (klei_id, purview, create_time, update_time) VALUES ?'
  const dataNow = Math.round(Number(new Date()) / 1000)
  await dbQuery(sql, [[[kleiId, purview, dataNow, dataNow]]])
  return true
}

export const POST = async (request: NextRequest) => {
  const req = await request.json()
  const { isSuccess, error } = await tryRes(postFun, req)
  if (isSuccess) return response(200, 200, true)
  return response(200, 400, error.message)
}

const putFun = async ({ id, kleiId, purview }: ConfigPutParams) => {
  const sql =
    'UPDATE player SET klei_id = ?, purview = ?, update_time = ? WHERE id = ?'
  const dataNow = Math.round(Number(new Date()) / 1000)
  await dbQuery(sql, [kleiId, purview, dataNow, id])
  return true
}

export const PUT = async (request: NextRequest) => {
  const req = await request.json()
  const { isSuccess, error } = await tryRes(putFun, req)
  if (isSuccess) return response(200, 200, true)
  return response(200, 400, error.message)
}

const deleteFun = async ({ id }: ConfigDeleteParams) => {
  const sql = 'DELETE FROM player WHERE id = ?'
  await dbQuery(sql, [id])
  return true
}

export const DELETE = async (request: NextRequest) => {
  const req = await request.json()
  const { isSuccess, error } = await tryRes(deleteFun, req)
  if (isSuccess) return response(200, 200, true)
  return response(200, 400, error.message)
}
