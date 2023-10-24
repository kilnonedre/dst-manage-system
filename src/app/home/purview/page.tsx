'use client'

import React, { useEffect, useState } from 'react'
import styles from './purviewStyle.module.scss'
import types from './purviewType.d'
import purviewTypes from '@/types/purviewType.d'
import mainTypes from '@/types/indexType.d'
import NextSelect from '@/components/nextSelect'
import PurviewModal from '@/components/purviewModal'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Input,
  useDisclosure,
  Pagination,
} from '@nextui-org/react'
import { getPlayer, deletePlayer } from '@/api'
import { purviewList } from '@/config/purview'
import Icon from '@/components/icon'

const columnList = [
  {
    key: 'serial',
    label: '#',
  },
  {
    key: 'klei_id',
    label: '科雷ID',
  },
  {
    key: 'purview',
    label: '权限',
  },
  {
    key: 'action',
    label: '操作',
  },
]

const purviewObj = {
  admin: { label: '管理员', color: 'primary' },
  white: { label: '白名单', color: 'success' },
  black: { label: '黑名单', color: 'danger' },
  normal: { label: '普通', color: 'default' },
}

const Purview = () => {
  const [kleiId, setKleiId] = useState('')
  const [purview, setPurview] = useState<purviewTypes.ConfigPurview | ''>('')
  const [playerList, setPlayerList] = useState<Array<types.ConfigPlayer>>([])
  const [player, setPlayer] = useState<types.ConfigPlayer | null>(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)

  const renderPlayer = async (p?: number) => {
    const response = await getPlayer({ purview, kleiId, page: p || page })
    const { code, data } = await response.json()
    if (code !== 200) return
    let serial = ((p || page) - 1) * 10 + 1
    data.playerList.map((player: types.ConfigPlayer) => {
      player.serial = serial
      serial++
    })
    const pages = Math.ceil(data.total / 10)
    setPages(pages)
    setPlayerList(data.playerList)
  }

  useEffect(() => {
    setPage(1)
    renderPlayer(1)
  }, [purview, kleiId])

  const edit = (player: types.ConfigPlayer) => {
    setPlayer(player)
    onOpen()
  }

  const create = () => {
    setPlayer(null)
    onOpen()
  }

  const reRender = () => {
    renderPlayer()
  }

  const remove = async (player: types.ConfigPlayer) => {
    const params = { id: player.id }
    const response = await deletePlayer(params)
    const { code } = await response.json()
    if (code !== 200) return
    if (playerList.length === 1 && page > 1) {
      setPage(page - 1)
      renderPlayer(page - 1)
      return
    }
    renderPlayer()
  }

  const changePagination = (p: number) => {
    renderPlayer(p)
    setPage(p)
  }

  const renderCell = (player: types.ConfigPlayer, key: types.ConfigKey) => {
    switch (key) {
      case 'serial':
        return player[key]
      case 'klei_id':
        return player[key]
      case 'purview':
        const playerKey = player[key] as purviewTypes.ConfigPurview
        return (
          <Chip
            color={purviewObj[playerKey].color as mainTypes.ConfigColor}
            variant="dot"
          >
            {purviewObj[playerKey].label}
          </Chip>
        )
      case 'action':
        return (
          <div className={styles['icon']}>
            <Icon
              font=""
              size="1.1rem"
              cursor="pointer"
              onPress={() => edit(player)}
            />
            <Icon
              font=""
              size="1.1rem"
              cursor="pointer"
              color="#ff0061"
              onPress={() => remove(player)}
            />
          </div>
        )
      default:
        const check: never = key
        return check
    }
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className={styles['purview']}>
      <div className={styles['purview-header']}>
        <Input
          className={styles['purview-header-input']}
          size="sm"
          isClearable
          type="text"
          placeholder="请输入科雷ID"
          onValueChange={setKleiId}
        />
        <NextSelect
          placeholder="权限等级"
          size="sm"
          width={100}
          list={purviewList}
          select={(p: purviewTypes.ConfigPurview) => setPurview(p || '')}
        />
        <Button size="sm" color="primary" onPress={create}>
          新建
        </Button>
        <PurviewModal
          title="添加用户"
          player={player}
          reRender={reRender}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
      </div>
      <div>
        <Table
          aria-label="Example table with dynamic content"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={page => changePagination(page)}
              />
            </div>
          }
        >
          <TableHeader columns={columnList}>
            {column => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={playerList}>
            {player => (
              <TableRow key={player.id}>
                {columnKey => (
                  <TableCell>
                    {renderCell(player, columnKey as types.ConfigKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Purview
