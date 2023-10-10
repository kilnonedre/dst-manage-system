'use client'

import React from 'react'
import styles from './fileStyle.module.scss'
import { Textarea, Button, Tabs, Tab } from '@nextui-org/react'
import Upload from '@/components/upload'

const tabList = [
  { mark: 'ground', title: '地面文件' },
  { mark: 'groundMod', title: '地面MOD' },
  { mark: 'burrow', title: '地洞文件' },
  { mark: 'burrowMod', title: '地洞MOD' },
]

const File = () => {
  return (
    <div className={styles['file']}>
      <div className={styles['file-upload']}>
        <Upload />
        <div className={styles['file-upload-button']}>
          <Button color="primary" size="sm">
            保存修改
          </Button>
          <Button color="danger" size="sm">
            默认配置
          </Button>
        </div>
      </div>
      <div className={styles['file-show']}>
        <Tabs radius="lg" aria-label="Tabs radius" items={tabList}>
          {tab => <Tab key={tab.mark} title={tab.title} />}
        </Tabs>
        <Textarea
          label="Description"
          labelPlacement="outside"
          maxRows={20}
          minRows={20}
          className={styles['file-show-textarea']}
          style={{ height: 'auto' }}
        />
      </div>
    </div>
  )
}

export default File
