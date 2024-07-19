import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth-context'
import IndexLayout from '@/components/layout'
import styles from './teams.module.css'

import TeamList from '@/components/page-components/teams/team_list'
import UserTeam from '@/components/page-components/teams/user_team'

export default function TeamPage() {
  const { login, logout, auth } = useAuth()
  return (
    <>
      <IndexLayout title="糾團" background="dark">
        <div className={styles.teamsPage}>
          <div className={styles.pageTitle}>
            <h2>糾團頁面</h2>
          </div>
          {!auth.id ? (
            <></>
          ) : (
            <div>
              <UserTeam />
            </div>
          )}
          <div>
            <TeamList />
          </div>
        </div>
      </IndexLayout>
    </>
  )
}
