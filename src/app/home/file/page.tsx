'use client'

import React, { useState, useMemo } from 'react'
import styles from './fileStyle.module.scss'
import types from './fileType.d'
import { Textarea, Button, Tabs, Tab } from '@nextui-org/react'
import Upload from '@/components/upload'
import { createCluster } from '@/api'

const tabList = [
  { mark: 'master', title: '地面文件' },
  { mark: 'masterMod', title: '地面MOD' },
  { mark: 'caves', title: '地洞文件' },
  { mark: 'cavesMod', title: '地洞MOD' },
]

const File = () => {
  const [file, setFile] = useState<types.ConfigFile>({
    master: '',
    masterMod: '',
    caves: '',
    cavesMod: '',
  })
  const [filename, setFilename] = useState<types.ConfigFilename>('master')

  const getText = useMemo(() => {
    return file[filename]
  }, [filename, file])

  const updateData = (data: types.ConfigFile) => {
    setFile(data)
  }

  const update = (text: string) => {
    setFile(file => ({ ...file, [filename]: text }))
  }

  const test = () => {
    createCluster(file)
  }

  return (
    <div className={styles['file']}>
      <div className={styles['file-upload']}>
        <Upload updateData={updateData} />
        <div className={styles['file-upload-button']}>
          <Button color="primary" size="sm" onPress={test}>
            保存修改
          </Button>
          <Button color="danger" size="sm">
            默认配置
          </Button>
        </div>
      </div>
      <div className={styles['file-show']}>
        <Tabs
          radius="lg"
          aria-label="Tabs radius"
          items={tabList}
          onSelectionChange={e => setFilename(e as types.ConfigFilename)}
        >
          {tab => <Tab key={tab.mark} title={tab.title} />}
        </Tabs>
        <Textarea
          label={filename}
          labelPlacement="outside"
          maxRows={20}
          minRows={20}
          className={styles['file-show-textarea']}
          value={getText}
          onValueChange={e => update(e)}
          style={{ height: 'auto' }}
        />
      </div>
    </div>
  )
}

export default File
