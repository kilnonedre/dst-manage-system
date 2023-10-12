'use client'

import React, { useEffect, useState } from 'react'
import styles from './indexStyle.module.scss'
import mainTypes from '@/types/indexType.d'
import { Input, Button } from '@nextui-org/react'
import { register, login, checkDatabase, createDatabase } from '@/api'
import { useRouter } from 'next/navigation'

const Index = () => {
  const [isCreateDB, setIsCreateDB] = useState(true)
  const [createDBLoad, setCreateDBLoad] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  useEffect(() => {
    mount()
  }, [])

  const mount = async () => {
    const response = await checkDatabase()
    const { data } = await response.json()
    setIsCreateDB(!data)
  }

  const log = async () => {
    const params = {
      email,
      password,
    }
    const response = await login(params)
    const { data } = await response.json()
    if (!data) return
    router.push('/home')
  }

  const signUp = async () => {
    const params = {
      email,
      password,
    }
    const response = await register(params)
    const { data } = await response.json()
    if (!data) return
    log()
  }

  const createDB = async () => {
    setCreateDBLoad(true)
    const response = await createDatabase()
    const { data } = await response.json()
    setIsCreateDB(!data)
    setCreateDBLoad(false)
  }

  const buttonList = [
    {
      mark: 'login',
      label: '登录',
      color: 'primary',
      function: log,
      isShow: !isCreateDB,
      isLoad: createDBLoad,
    },
    {
      mark: 'signUp',
      label: '注册',
      color: 'default',
      function: signUp,
      isShow: !isCreateDB,
      isLoad: createDBLoad,
    },
    {
      mark: 'createDB',
      label: '创建数据库',
      color: 'danger',
      function: createDB,
      isShow: isCreateDB,
      isLoad: createDBLoad,
    },
  ]

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
        onValueChange={setEmail}
      />
      <Input
        className={styles['index-password']}
        type="password"
        variant="bordered"
        label="密码"
        placeholder="请输入密码"
        onValueChange={setPassword}
      />
      {buttonList.map(button => {
        return button.isShow ? (
          <Button
            key={button.mark}
            className={styles['index-button']}
            color={button.color as mainTypes.ConfigColor}
            onClick={button.function}
            isLoading={button.isLoad}
          >
            {button.label}
          </Button>
        ) : null
      })}
    </div>
  )
}

export default Index
