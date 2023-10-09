'use client'

import React from 'react'
import types from './configType.d'
import styles from './configStyle.module.scss'
import { Input, Select, SelectItem, Button } from '@nextui-org/react'

const configList: Array<types.ConfigConfig> = [
  {
    mark: 'input',
    label: '服务器名称',
  },
  {
    mark: 'input',
    label: '服务器描述',
  },
  {
    mark: 'input',
    label: '服务器密码',
  },
  {
    mark: 'input',
    label: '服务器人数',
  },
  {
    mark: 'input',
    label: '白名单游戏位',
  },
  {
    mark: 'select',
    label: 'PVP',
  },
  {
    mark: 'select',
    label: '游戏模式',
  },
  {
    mark: 'select',
    label: '自动暂停',
  },
  {
    mark: 'select',
    label: '投票',
  },
  {
    mark: 'select',
    label: '存档天数',
  },
]

const serverList = [
  { label: '所有', value: 'all' },
  { label: '地面', value: 'ground' },
  { label: '地洞', value: 'burrow' },
]

const Config = () => {
  const render = (config: types.ConfigConfig, index: number) => {
    switch (config.mark) {
      case 'input':
        return (
          <Input
            label={config.label}
            size="sm"
            variant="bordered"
            key={index}
          />
        )
      case 'select':
        return (
          <Select
            items={serverList}
            label={config.label}
            size="sm"
            variant="bordered"
            key={index}
          >
            {server => (
              <SelectItem key={server.value}>{server.label}</SelectItem>
            )}
          </Select>
        )
      default:
        const check: never = config.mark
        return check
    }
  }

  return (
    <div className={styles['config']}>
      <div className={styles['config-form']}>
        <div className={styles['config-form-body']}>
          {configList.map((config, index) => {
            return render(config, index)
          })}
        </div>
        <div className={styles['config-form-footer']}>
          <Button color="primary">提交</Button>
          <Button color="danger">重置</Button>
        </div>
      </div>
    </div>
  )
}

export default Config
