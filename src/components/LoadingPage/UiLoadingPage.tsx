import React from "react"
import Head from 'next/head'

import style from './UiLoadingPage.module.scss'
import LogoPUPRSvg from '@images/LogoPUPRSvg'

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function UiLoadingPage() {
  return (
    <section className={style.loadingPageContainer}>
      <Head>
        <title>Loading...</title>
      </Head> 
      <div className={style.loadingContainer}>
        <LogoPUPRSvg/>
        <Spin indicator={antIcon} className={style.icon}/>
      </div>
    </section>
  )
}

