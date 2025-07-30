import React from 'react'
import { Button } from 'antd'
import Icon from "@ant-design/icons"

import style from '../PetaSebaran.module.scss'
import {Icon as RumahSusunIcon} from '@images/icons/RumahSusun'
import {Icon as RumahKhususIcon} from '@images/icons/RumahKhusus'
import {Icon as RumahSwadayaIcon} from '@images/icons/RumahSwadaya'
import {Icon as RumahUmumDanKomersilIcon} from '@images/icons/RumahUmumDanKomersil'

export const LIST = [
  {
    id: '1',
    title: 'Semua',
    idType: '1,2,3,4'
  },
  {
    id: '2',
    title: 'Rumah Susun',
    icon: <Icon style={{ marginLeft: 5 }} component={RumahSusunIcon}/>,
    idType: '1'
  },
  {
    id: '3',
    title: 'Rumah Khusus',
    icon: <Icon style={{ marginLeft: 5 }} component={RumahKhususIcon}/>,
    idType: '2'
  },
  {
    id: '4',
    title: 'Rumah Swadaya',
    icon: <Icon style={{ marginLeft: 5 }} component={RumahSwadayaIcon}/>,
    idType: '3'
  },
  {
    id: '5',
    title: 'Rumah Umum & Komersil',
    icon: <Icon style={{ marginLeft: 5 }} component={RumahUmumDanKomersilIcon}/>,
    idType: '4'
  },
]

export default function Options(props) {
  const { handleSelect, selected, disabled } = props

  return (
    <div className={style['button-container']}>
      {
        LIST?.map(x=>(
          <Button
            disabled={disabled}
            key={x.title}
            onClick={_=>handleSelect(x)}
            className={`${selected === x?.idType ? `${style['button']} ${style['active']}` : style['button']}`}
          >
            {x?.icon}
            {x.title}
          </Button>
        ))
      }
    </div>
  )
} 