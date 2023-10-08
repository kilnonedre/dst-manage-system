import React from 'react'
import styles from './layoutStyle.module.scss'
import types from './layoutType.d'

const RootLayout = ({ children, header, menu }: types.ConfigLayout) => {
  return (
    <div className={styles['layout']}>
      <div className={styles['layout-header']}>{header}</div>
      <div className={styles['layout-body']}>
        <div className={styles['layout-body-menu']}>{menu}</div>
        <div className={styles['layout-body-children']}>{children}</div>
      </div>
    </div>
  )
}

export default RootLayout
