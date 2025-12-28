import React,{createContext, useContext, useState} from 'react'
export const UserDataContext = createContext()

const DataContext = ({children}) => {
    const [savedata, setSaveData] = useState({
        email:"",
        username:"",
    })
    const [startFetchTOKEN, setStartFetchTOKEN] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    

  return (
    <>
    <UserDataContext.Provider value={{savedata, setSaveData, startFetchTOKEN, setStartFetchTOKEN, isLoading, setisLoading}}>
        {children}
    </UserDataContext.Provider>
    </>
  )
}

export default DataContext