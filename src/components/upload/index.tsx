'use client'

import React, { useRef, useEffect } from 'react'
import styles from './uploadStyle.module.scss'

const Upload = () => {
  const fileFakeEle = useRef<HTMLDivElement>(null)
  const fileRealEle = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let ele: HTMLDivElement | null = null
    if (fileFakeEle.current) {
      fileFakeEle.current.addEventListener('drop', handleDrop)
      ele = fileFakeEle.current
    }
    return () => {
      ele && ele.removeEventListener('drop', handleDrop)
    }
  })

  const handleClearDragDefault = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: any) => {
    handleClearDragDefault(e)
    const files = [...e.dataTransfer.files]

    if (files && files.length) {
      ;(fileRealEle as any).onUpload(files)
    }
  }

  const handleClick = () => {
    if (!fileRealEle.current) return
    fileRealEle.current.click()
  }

  const test = () => {
    if (!fileRealEle.current || !fileRealEle.current.files) return
  }

  return (
    <div className={styles['upload']}>
      <div
        ref={fileFakeEle}
        className={styles['upload-main']}
        onClick={handleClick}
        onDragEnter={handleClearDragDefault}
        onDragLeave={handleClearDragDefault}
        onDragOver={handleClearDragDefault}
      >
        <p className={styles['upload-main-icon']}></p>
        <p className={styles['upload-main-title']}>
          将文件拖到此处，或<span>点击上传</span>
        </p>
      </div>
      <input
        className={styles['upload-input']}
        type="file"
        ref={fileRealEle}
        onChange={test}
      />
    </div>
  )
}

export default Upload
