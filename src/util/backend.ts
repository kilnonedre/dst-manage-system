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

export const tryRes = async (fun: Function, ...args: any) => {
  try {
    const result = await fun(...args)
    return { isSuccess: true, data: result }
  } catch (error: any) {
    return { isSuccess: false, error: error }
  }
}
