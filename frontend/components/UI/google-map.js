import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Block } from '@mui/icons-material'

function GoogleMap() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '80px',
        marginBottom: '80px',
      }}
    >
      <div className="col-6">
        <ul>
          <div
            style={{
              marginBottom: '196px',
              fontSize: '48px',
              fontWeight: 'bold',
            }}
          >
            台北館
          </div>
          <li
            style={{
              marginBottom: '18px',
            }}
          >
            營業時間 10:00-21:00（預約洽詢時間）
          </li>
          <li
            style={{
              marginBottom: '18px',
            }}
          >
            電話
          </li>
          <li>地址</li>
        </ul>
      </div>
      <iframe
        className="col-6"
        title="Google Map" // 添加唯一的title屬性
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.2719632541734!2d121.53947571031206!3d25.024842977729815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442aa29379b8db9%3A0x6c7f37e71cce4568!2z6LOH562W5pyD!5e0!3m2!1szh-TW!2stw!4v1719301218451!5m2!1szh-TW!2stw"
        width="570"
        height="380"
        style={{ border: 0, borderRadius: '10px' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}

export default GoogleMap