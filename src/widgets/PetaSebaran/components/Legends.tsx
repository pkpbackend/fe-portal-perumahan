import React from 'react'

import style from '../PetaSebaran.module.scss'

const LIST = [
  {
    id: '1',
    title: <div className={style['title-legends']} >Rumah Rusun</div>,
    icon: <div className={style['icon-legends']}  style={{ background: '#CF2F7C', width: "15px", height: "15px", borderRadius: 80 }} />,
  },
  {
    id: '2',
    title: <div className={style['title-legends']} >Rumah Khusus</div>,
    icon: <div className={style['icon-legends']} style={{ background: '#A972EC', width: "15px", height: "15px", borderRadius: 80 }}/>,
  },
  {
    id: '3',
    title: <div className={style['title-legends']} >Rumah Swadaya</div>,
    icon: <div className={style['icon-legends']} style={{ background: '#20AC47', width: "15px", height: "15px", borderRadius: 80 }}/>
  },
  {
    id: '4',
    title: <div className={style['title-legendss']} >Rumah Umum & Komersil</div>,
    icon: <div className={style['icon-legendss']} style={{ background: '#FF6D03', width: "15px", height: "15px", borderRadius: 80 }}/>
  },
  
]

export default function Legends(props) {
  const { selected } = props
  return (
    <div className={style['legend-container']}>
      {
        LIST.filter((x:any) => {
          if (selected !== '1,2,3,4') {
            if (x?.id == selected) {
              return x
            }
          } else {
            return x
          }
        })?.map(x=>(
          <div key={x.id} className={style['legend']}>
            {x?.icon}
            {x.title}
          </div>
        ))
      }
    </div>
  )
} 