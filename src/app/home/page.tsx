'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import styles from './homeStyle.module.scss'
import mainTypes from '@/types/iniType.d'
import { Chip, Select, SelectItem, Button } from '@nextui-org/react'
import * as echarts from 'echarts'
import { deepClone } from '@/util/deepClone'
import { getConfig } from '@/api'

const serverList = [
  { label: '所有', value: 'all' },
  { label: '地面', value: 'ground' },
  { label: '地洞', value: 'burrow' },
]

const serverStatusObj = {
  standby: {
    isLoading: true,
    color: 'primary',
    text: '服务器状态获取中',
  },
  startup: {
    isLoading: false,
    color: 'danger',
    text: '关闭服务器',
  },
  closure: {
    isLoading: false,
    color: 'primary',
    text: '开启服务器',
  },
}

const Home = () => {
  const cpuChartRef = useRef(null)
  const gpuChartRef = useRef(null)
  const [config, setConfig] = useState<mainTypes.ConfigMainConfig | null>(null)

  useEffect(() => {
    updateConfig()
  }, [])

  const updateConfig = async () => {
    const response = await getConfig()
    const { data } = await response.json()
    setConfig(data)
  }

  useEffect(() => {
    const cpuChart = echarts.init(cpuChartRef.current)
    const gpuChart = echarts.init(gpuChartRef.current)
    const option = {
      title: {
        text: 'Node Align Left',
        left: 'center',
      },
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 15,
              color: [
                [0.3, '#67e0e3'],
                [0.7, '#37a2da'],
                [1, '#fd666d'],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: 'auto',
            },
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2,
            },
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 4,
            },
          },
          axisLabel: {
            color: 'inherit',
            distance: 25,
            fontSize: 12,
          },
          detail: {
            valueAnimation: true,
            formatter: '{value} %',
            color: 'inherit',
            fontSize: 14,
          },
          data: [
            {
              value: 70,
            },
          ],
        },
      ],
    }
    option.title.text = 'GPU资源'
    const gpuOption = deepClone(option)
    gpuChart.setOption(gpuOption)
    option.title.text = 'CPU资源'
    const cpuOption = deepClone(option)
    cpuChart.setOption(cpuOption)
    setInterval(function () {
      cpuChart.setOption({
        series: [
          {
            data: [
              {
                value: +(Math.random() * 100).toFixed(2),
              },
            ],
          },
        ],
      })
    }, 2000)
  }, [])

  const [server, setServer] = useState('')
  const [serverStatus, setServerStatus] = useState<boolean | null>(null)

  const serverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServer(e.target.value)
  }

  const handler = (status: boolean | null) => {
    let mark = ''
    switch (status) {
      case null:
        mark = 'standby'
        break
      case true:
        mark = 'startup'
        break
      case false:
        mark = 'closure'
        break
    }
    return serverStatusObj[mark as 'standby' | 'startup' | 'closure']
  }

  const computed = useMemo(() => handler(serverStatus), [serverStatus])

  return (
    <div className={styles['home']}>
      <div className={styles['home-information']}>
        <div className={styles['home-information-item']}>
          <div className={styles['home-information__title']}>服务器名称：</div>
          <div className={styles['home-information-item']}>
            {config?.NETWORK.cluster_name}
          </div>
        </div>
        <div className={styles['home-information-item']}>
          <div className={styles['home-information__title']}>最大玩家数：</div>
          <div className={styles['home-information-item']}>
            {config?.GAMEPLAY.max_players} 人
          </div>
        </div>
        <div className={styles['home-information-item']}>
          <div className={styles['home-information__title']}>
            服务器直连地址：
          </div>
          <div className={styles['home-information-item']}>112233.com</div>
        </div>
        <div className={styles['home-information-item']}>
          <div className={styles['home-information__title']}>游戏版本号：</div>
          <div className={styles['home-information-item']}>575400</div>
        </div>
        <div className={styles['home-information-item']}>
          <div className={styles['home-information__title']}>存档天数：</div>
          <div className={styles['home-information-item']}>30天</div>
        </div>
        <div className={styles['home-information-item']}>
          <div className={styles['home-information__title']}>存档季节：</div>
          <div className={styles['home-information-item']}>
            秋季 第24天，季节还剩26天
          </div>
        </div>
        <div className={styles['home-information-item']}>
          <div className={styles['home-information__title']}>运行状态：</div>
          <Chip color="warning" variant="dot">
            Dot
          </Chip>
        </div>
        <div className={styles['home-information-item']}>
          <div className={styles['home-information__title']}>在线人数：</div>
          <div className={styles['home-information-item']}>0人</div>
        </div>
        <div className={styles['home-information-item']}>
          <div className={styles['home-information__title']}>服务器管理：</div>
          <Select
            items={serverList}
            label="服务器"
            size="sm"
            onChange={serverChange}
          >
            {server => (
              <SelectItem key={server.value}>{server.label}</SelectItem>
            )}
          </Select>
          <Button
            className={styles['flex-shrink']}
            color={computed.color as 'primary' | 'danger'}
            isLoading={computed.isLoading}
            onClick={() => {
              setServerStatus(true)
            }}
          >
            {computed.text}
          </Button>
          {server !== 'all' && server !== '' ? (
            <Button color="secondary">打开控制台</Button>
          ) : null}
        </div>
        <div className={styles['home-information-item']}>
          <div className={styles['home-information__title']}>MOD管理：</div>
          <Button color="primary">更新MOD</Button>
        </div>
        <div className={styles['home-information-item']}>
          <div className={styles['home-information__title']}>存档管理：</div>
          <Select items={serverList} label="服务器" size="sm">
            {server => (
              <SelectItem key={server.value}>{server.label}</SelectItem>
            )}
          </Select>
          <Button color="danger">删除存档</Button>
        </div>
        <div className={styles['home-information-item']}>
          <div className={styles['home-information__title']}>回档管理：</div>
          <Select items={serverList} label="服务器" size="sm">
            {server => (
              <SelectItem key={server.value}>{server.label}</SelectItem>
            )}
          </Select>
          <Select items={serverList} label="回档天数" size="sm">
            {server => (
              <SelectItem key={server.value}>{server.label}</SelectItem>
            )}
          </Select>
          <Button color="primary">回档</Button>
        </div>
      </div>
      <div className={styles['home-resource']}>
        <div ref={cpuChartRef} className={styles['home-resource-panel']}></div>
        <div ref={gpuChartRef} className={styles['home-resource-panel']}></div>
      </div>
    </div>
  )
}

export default Home
