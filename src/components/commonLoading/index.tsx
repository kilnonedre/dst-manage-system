import React from 'react'
import styles from './commonLoadingStyle.module.scss'
import types from './commonLoadingType.d'
import { CircularProgress } from '@nextui-org/react'

const CommonLoading = (props: types.ConfigProps) => {
  const style = {
    height: props.height,
  }

  return (
    <div className={styles['loading']} style={style}>
      <CircularProgress color="primary" aria-label="Loading..." />
    </div>
  )
}

export default CommonLoading
