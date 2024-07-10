import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GET_CHAT } from '@/configs/api-path'
import styles from './teams.module.css'
import PdBtnContained from '@/components/UI/pd-btn-contained'

export default function ChatDisplay({
  chat_at = 0,
  chat_by = 0,
  nick_name = '暱稱',
  avatar = 'default.png',
  chat_text = '留言內容',
  create_at = '留言時間',
}) {

  const router = useRouter()

  const [chat, setChat] = useState({
    chat_at: 0,
    chat_by: 0,
    nick_name: '暱稱',
    avatar: 'default.png',
    chat_text: '留言內容',
    create_at: '留言時間',
  })

  const getChat = async (team_id) => {
    
    try {
      const res = await fetch(url)
      //
      const resData = await res.json()

      const url = 'http://localhost:3001/teams/api/' + team_id
      if (resData.success) {
        const teamData = resData.data
        if (teamData && teamData.team_id) {
          setChat({
            branch_name: teamData.branch_name || '',
            difficulty: teamData.difficulty || '',
            end_time: teamData.end_time || '',
            nick_name: teamData.nick_name || '',
            reservation_date: teamData.reservation_date || '',
            start_time: teamData.start_time || '',
            team_id: teamData.team_id || 0,
            team_title: teamData.team_title || '',
            theme_name: teamData.theme_name || '',
            themeImg: teamData.theme_img || '',
            themeTime: teamData.theme_Time || '',
          })
          console.log('Team data set successfully', teamData)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query)
      const { team_id } = router.query
      getChat(team_id)
      console.log(chat)
    }
  })



  return (
    <>
      <div className={styles.borderbox}>
        <h4>留言給團長</h4>
        <form>
          <inputarea></inputarea>
        </form>
        <div style={{ textAlign: 'center' }}>
          <PdBtnContained btnText="送出留言" color="grey" />
        </div>
      </div>

      <div className={styles.borderbox}>
        <div>
          <h4>留言區</h4>
        </div>
        <img src={`/${avatar}`} />
        <div>
          {nick_name} {create_at}
        </div>
        <div>{chat_text}</div>
        <hr />
      </div>
    </>
  )
}