import React, { useEffect, useRef, useState } from 'react'
import dynamic from "next/dynamic"
import { Col, Row, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

import useDashboard from '@hooks/useDashboard'
import Options from './components/Option'
import Legends from './components/Legends'
import style from './PetaSebaran.module.scss'

const Map = dynamic(() => import("./components/Map"), { ssr:false })

export default function PortalWidget() {
  const { 
    mapLoading,
    map, 
    fetchMap, 
  } = useDashboard()

  const mapRef = useRef(null)
  const [selected, onSelected] = useState('1,2,3,4')
  const [mapsComponent, setMapsComponent] = useState({
    clientHeight: 0,
    clientWidth: 0
  })

  const handleSelect = (val : any) => {
    const { idType } = val
    onSelected(idType)
  }

  useEffect(() => {
    fetchMap({
      idType: selected,
      tahun: 2015,
      sampaiTahun: new Date().getFullYear(),
    })
  }, [selected])

  useEffect(() => {
    if (
      mapRef.current.clientHeight !== mapsComponent.clientHeight ||
      mapRef.current.clientWidth !== mapsComponent.clientWidth
    ) {
      setMapsComponent({
        clientHeight: mapRef.current.clientHeight,
        clientWidth: mapRef.current.clientWidth
      })
    }
  })

  return (
    <section className={style.container}>
      <h2>Peta Sebaran Perumahan</h2>
      <Row>
        <Col style={{margin: 'auto'}}>
          <Options 
            handleSelect={handleSelect} 
            selected={selected} 
          />
        </Col>
      </Row>
      {
        mapLoading &&
        <div
          style={{
            background: 'rgba(0,0,0,0.5)',
            height: mapsComponent.clientHeight,
            width: mapsComponent.clientWidth,
            position: 'absolute',
            marginTop: 25,
            borderRadius: 10,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 75, color: '#FFC928' }} spin />} />
        </div>
      }
      <div
        ref={mapRef}
        style={{
          marginTop: 25
        }}
      >
        {/* @ts-ignore */}
        <Map fetchData={map}/>
      </div>
      <Row>
        <Col style={{margin: 'auto'}}>
          <Legends selected={selected}/>
        </Col>
      </Row>
    </section>
  )
} 