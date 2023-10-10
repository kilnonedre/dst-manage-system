import React from 'react'
import styles from './menuStyle.module.scss'

const menuList = ['控制台', '基本配置', '世界文件', '权限配置', '存档管理']

const Menu = () => {
  return (
    <div className={styles['menu']}>
      {menuList.map((menu, index) => {
        return (
          <div key={index} className={styles['menu-item']}>
            <div className={styles['menu-item-main']}>{menu}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Menu
