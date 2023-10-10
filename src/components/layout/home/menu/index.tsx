'use client'

import React from 'react'
import styles from './menuStyle.module.scss'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const menuList = [
  { mark: 'console', name: '控制台', href: '' },
  { mark: 'config', name: '基本配置', href: 'config' },
  { mark: 'file', name: '世界文件', href: 'file' },
  { mark: 'purview', name: '权限配置', href: 'purview' },
  { mark: 'archive', name: '存档管理', href: 'archive' },
]

const Menu = () => {
  let pathname = usePathname().split('/').pop()

  return (
    <div className={styles['menu']}>
      {menuList.map(menu => {
        if (pathname === 'home') {
          pathname = ''
        }
        const isActive = pathname === menu.href
        return (
          <div key={menu.mark} className={styles['menu-item']}>
            <Link
              href={`/home/${menu.href}`}
              className={`${styles['menu-item-main']} ${
                isActive && styles['active']
              }`}
            >
              {menu.name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Menu
