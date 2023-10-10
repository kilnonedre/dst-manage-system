'use client'

import React from 'react'
import styles from './archiveStyle.module.scss'
import types from './archiveType.d'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
} from '@nextui-org/react'

const columnList = [
  {
    key: 'file',
    label: '文件名',
  },
  {
    key: 'action',
    label: '操作',
  },
]

const rowList = [
  {
    file: '1',
    action: 'Active',
  },
  {
    file: '2',
    action: 'Paused',
  },
  {
    file: '3',
    action: 'Active',
  },
  {
    file: '4',
    action: 'Vacation',
  },
]

const archiveManageList = [
  { mark: 'upload', label: '上传存档' },
  { mark: 'download', label: '下载存档' },
  { mark: 'backup', label: '备份存档' },
]

const backupManageList = [
  { mark: 'upload', label: '上传', color: 'primary' },
  { mark: 'download', label: '下载', color: 'secondary' },
  { mark: 'delete', label: '删除', color: 'danger' },
  { mark: 'rename', label: '重命名', color: 'default' },
]

const Archive = () => {
  const renderCell = (row: types.ConfigRow, key: types.ConfigKey) => {
    switch (key) {
      case 'file':
        return row[key]
      case 'action':
        return (
          <div className={styles['archive-backup__button']}>
            {backupManageList.map(backupManage => {
              return (
                <Button
                  color={backupManage.color as types.ConfigColor}
                  key={backupManage.mark}
                  size="sm"
                >
                  {backupManage.label}
                </Button>
              )
            })}
          </div>
        )
      default:
        const check: never = key
        return check
    }
  }

  return (
    <div className={styles['archive']}>
      <div className={styles['archive-file']}>
        <div className={styles['archive__title']}>存档管理</div>
        <div className={styles['archive-file-button']}>
          {archiveManageList.map(archiveManage => {
            return (
              <Button color="primary" key={archiveManage.mark} size="sm">
                {archiveManage.label}
              </Button>
            )
          })}
        </div>
      </div>
      <div className={styles['archive-backup']}>
        <div className={styles['archive__title']}>备份管理</div>
        <Table
          aria-label="Rows actions table example with dynamic content"
          selectionMode="single"
          className={styles['archive-backup-table']}
        >
          <TableHeader columns={columnList}>
            {column => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rowList}>
            {row => (
              <TableRow key={row.file}>
                {columnKey => (
                  <TableCell>
                    {renderCell(row, columnKey as types.ConfigKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          className={styles['archive-backup-pagination']}
          total={10}
          initialPage={1}
          size="sm"
        />
      </div>
    </div>
  )
}

export default Archive
