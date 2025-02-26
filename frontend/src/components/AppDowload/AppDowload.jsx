// eslint-disable-next-line no-unused-vars
import React from 'react'
import './AppDowload.css'
import { assets } from '../../assets/assets'
const AppDowload = () => {
  return (
    <div className='app-dowload'id='app-dowload'>
      <p>Tai App o day</p>
      <div className='app-dowload-platforms'>
        <img src={assets.app_store} alt="" />
        <img src={assets.play_store} alt="" />
      </div>
    </div>
  )
}

export default AppDowload
