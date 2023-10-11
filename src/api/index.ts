import { Get, Post } from '@/config/http'

export const log = (params: object) => Post('/api/login', params)

export const checkDatabase = () => Get('/api/database')

export const createDatabase = () => Post('/api/database')
