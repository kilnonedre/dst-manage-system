import React from 'react'
import styles from './layoutStyle.module.scss'
import types from './layoutType.d'
import Header from '@/components/layout/home/header'
import Menu from '@/components/layout/home/menu'

const RootLayout = ({ children }: types.ConfigLayout) => {
  return (
    <div className={styles['layout']}>
      <div className={styles['layout-header']}>
        <Header />
      </div>
      <div className={styles['layout-body']}>
        <div className={styles['layout-body-menu']}>
          <Menu />
        </div>
        <div className={styles['layout-body-children']}>
          <div className={styles['layout-body-children-panel']}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default RootLayout
