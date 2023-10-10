'use client'

import React, { useRef, useEffect } from 'react'
import styles from './uploadStyle.module.scss'

const Upload = () => {
  const fileFakeEle = useRef<HTMLDivElement>(null)
  const fileRealEle = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (fileFakeEle.current) {
      fileFakeEle.current.addEventListener('dragover', handleClearDragDefault)
      fileFakeEle.current.addEventListener('drop', handleDrop)
      fileFakeEle.current.addEventListener('dragenter', handleClearDragDefault)
      fileFakeEle.current.addEventListener('dragleave', handleClearDragDefault)
      return () => {
        if (fileFakeEle.current) {
          fileFakeEle.current.removeEventListener(
            'dragover',
            handleClearDragDefault
          )
          fileFakeEle.current.removeEventListener('drop', handleDrop)
          fileFakeEle.current.removeEventListener(
            'dragenter',
            handleClearDragDefault
          )
          fileFakeEle.current.removeEventListener(
            'dragleave',
            handleClearDragDefault
          )
        }
      }
    }
  })

  const handleClearDragDefault = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: any) => {
    handleClearDragDefault(e)
    const files = [...e.dataTransfer.files]

    console.log(files[0])

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
    console.log(fileRealEle.current.files[0])
  }

  return (
    <div className={styles['upload']}>
      <div
        ref={fileFakeEle}
        className={styles['upload-main']}
        onClick={handleClick}
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
