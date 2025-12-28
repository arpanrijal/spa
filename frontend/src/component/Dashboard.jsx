import React, { useContext } from 'react'
import { UserDataContext } from '../context/DataContext'

const Dashboard = () => {
  const {savedata, setSaveData} = useContext(UserDataContext)
  return (
    <>
    <div>Dashboard</div>
    <div>{console.log(savedata, savedata.email, savedata.username)}</div>
    <div>{savedata.email}</div>
    <div>{savedata.username}</div>
    {/* <div>{savedata.data.marketStatus}</div> */}
    </>
  )
}

export default Dashboard