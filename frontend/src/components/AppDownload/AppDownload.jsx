import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/frontend_assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id="app-download">
        <p>For better experience Download<br/>Tomato App</p>
        <div className="app-download-platforms">
           <a href="https://play.google.com/store/apps/"> <img src={assets.play_store} alt=""  /></a>
           <a href="https://www.apple.com/in/app-store/"> <img src={assets.app_store} alt="" /></a>
        </div>
    </div>
  )
}

export default AppDownload
