import React, { useContext, useEffect, useState, } from 'react'
import { UserDataContext } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import NoDataFound from './NoDataFound'
import axios from 'axios'

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [showNoDataFound, setShowNoDataFound] = useState(false)
  const { startFetchTOKEN, setStartFetchTOKEN, isLoading, setisLoading } = useContext(UserDataContext)
  useEffect(() => {
    const protectWrap = async () => {
      if (!startFetchTOKEN) return
      try {
        const response = await axios.get('http://localhost:3000/me', {
          withCredentials: true, 
        })
        if (response.status === 200) {
          setSaveData(response.data.user)
          setisLoading(false)
        } else {
          navigate('/login')
          return
        }

      } catch (error) {
        if (error.response?.status === 403) {
          setShowNoDataFound(true)
          setisLoading(false)
        } else {
          navigate('/login')
          return
        }
      }
      setStartFetchTOKEN(false)
      return
    }
    protectWrap()
  }, [startFetchTOKEN])
  if (isLoading) return <Loading />
  if (showNoDataFound) return <NoDataFound />

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper