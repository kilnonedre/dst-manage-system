import React from 'react'
import styles from './iconStyle.module.scss'
import types from './iconType.d'

const Icon = (props: types.ConfigProps) => {
  const style = {
    'font-size': props.size,
    color: props.color,
    cursor: props.cursor,
  }

  console.log(style)
  return (
    <i className={styles['icon']} style={style} onClick={props.onPress}>
      {props.font}
    </i>
  )
}

export default Icon
