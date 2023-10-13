import { Get, Post } from '@/config/http'

/* 用户 */

// 登录
export const login = (params: object) => Post('/api/users/login', params)

// 注册
export const register = (params: object) => Post('/api/users/register', params)

/* 数据库 */

// 检查数据库是否创建
export const checkDatabase = () => Get('/api/databases')

// 创建数据库
export const createDatabase = () => Post('/api/databases')

/* 配置 */

// 获取当前配置
export const getConfig = () => Get('/api/configs')
