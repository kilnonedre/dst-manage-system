import React from 'react'
import types from './nextSelectType.d'
import styles from './nextSelectStyle.module.scss'
import { Select, SelectItem } from '@nextui-org/react'

const NextSelect = (props: types.ConfigProps) => {
  return (
    <Select
      items={props.list}
      label="small select"
      placeholder={props.placeholder}
      labelPlacement="outside"
      size={props.size}
      disallowEmptySelection={props.noEmpty}
      style={{ width: `${props.width ? props.width + 'px' : 'auto'}` }}
      className={styles['select']}
      defaultSelectedKeys={props.default ? [props.default] : []}
      onSelectionChange={e => props.select(Array.from(e)[0])}
    >
      {list => (
        <SelectItem key={list.key} value={list.value}>
          {list.value}
        </SelectItem>
      )}
    </Select>
  )
}

export default NextSelect
