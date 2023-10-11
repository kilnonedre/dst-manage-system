import { NextResponse } from 'next/server'

export const response = (
  status: number,
  code: number,
  data: any,
  msg: string = 'success'
) => {
  const res = { code, data, msg }
  return NextResponse.json(res, { status })
}
