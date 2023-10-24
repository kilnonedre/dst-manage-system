import { Get, Post, Put, Delete } from '@/config/http'

const splicePath = (path: string) => {
  return '/api' + path
}

/* 用户 */

// 登录
export const login = (params: object) =>
  Post(splicePath('/users/login'), params)

// 注册
export const register = (params: object) =>
  Post(splicePath('/users/register'), params)

/* 数据库 */

// 检查数据库是否创建
export const checkDatabase = () => Get(splicePath('/databases'))

// 创建数据库
export const createDatabase = () => Post(splicePath('/databases'))

/* 配置 */

// 获取当前配置
export const getConfig = () => Get(splicePath('/configs'))

/* 玩家 */

// 获取当前玩家信息
export const getPlayer = (params: Object) => Get(splicePath('/players'), params)

// 创建玩家信息
export const createPlayer = (params: Object) =>
  Post(splicePath('/players'), params)

// 更新玩家信息
export const updatePlayer = (params: Object) =>
  Put(splicePath('/players'), params)

// 删除玩家信息
export const deletePlayer = (params: Object) =>
  Delete(splicePath('/players'), params)
