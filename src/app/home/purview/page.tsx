'use client'

import React from 'react'
import styles from './purviewStyle.module.scss'
import { Tabs, Tab, Input, Button } from '@nextui-org/react'

const tabList = [
  { mark: 'admin', title: '管理员名单' },
  { mark: 'white', title: '白名单' },
  { mark: 'black', title: '黑名单' },
]

const purviewList = [{ id: 'test0' }, { id: 'test1' }]

const Purview = () => {
  return (
    <div className={styles['purview']}>
      <Tabs radius="lg" aria-label="Tabs radius" items={tabList}>
        {tab => <Tab key={tab.mark} title={tab.title} />}
      </Tabs>
      <div className={styles['purview-list']}>
        {purviewList.map(purview => {
          return (
            <Input
              type="email"
              variant="bordered"
              label="Email"
              size="sm"
              key={purview.id}
            />
          )
        })}
      </div>
      <div className={styles['purview-button']}>
        <Button color="primary" size="sm">
          添加成员
        </Button>
        <Button color="primary" size="sm">
          确认名单
        </Button>
      </div>
    </div>
  )
}

export default Purview
