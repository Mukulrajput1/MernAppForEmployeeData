import React, { useContext } from 'react'
import { useState,createContext } from 'react';


const contexter = createContext()
export function ProvideContext({children}) {

  const [login,setLogin] = useState(false)
  const [user,setUser] = useState()
  
  return (
    <div>
      <contexter.Provider value={{login,setLogin,user,setUser}}>
        {children}
      </contexter.Provider>
    </div>
  )
}
 export const useContexter = () =>
 {
  return useContext(contexter)
 } 