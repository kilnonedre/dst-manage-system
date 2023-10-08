'use client'

import React from 'react'
import styles from './indexStyle.module.scss'
import { Input, Button } from '@nextui-org/react'

const Index = () => {
  return (
    <div className={styles['index']}>
      <div className={styles['index-title']}>Steam</div>
      <div className={styles['index-title']}>饥荒</div>
      <div className={styles['index-tip']}>后台管理系统</div>
      <Input
        type="email"
        variant="bordered"
        label="邮箱"
        placeholder="请输入邮箱"
      />
      <Input
        className={styles['index-password']}
        type="password"
        variant="bordered"
        label="密码"
        placeholder="请输入密码"
      />
      <Button className={styles['index-button']} color="primary">
        登录
      </Button>
    </div>
  )
}

export default Index
