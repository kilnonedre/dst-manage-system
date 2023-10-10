'use client'

import React from 'react'
import styles from './fileStyle.module.scss'
import { Textarea, Button } from '@nextui-org/react'
import Upload from '@/components/upload'

const navItemList = [
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
        <div className={styles['nav']}>
          {navItemList.map(navItem => {
            return (
              <div className={styles['nav-item']} key={navItem.mark}>
                {navItem.title}
              </div>
            )
          })}
        </div>
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
