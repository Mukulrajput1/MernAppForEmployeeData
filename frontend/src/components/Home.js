import React from 'react'
import LoginForm from './LoginForm'
import { useContexter } from '../Contexter'
import AdminPanel from './AdminPanel'
import Navbar from './Navbar'
import { Route,Routes } from 'react-router-dom'
import Employee from './Employee'
import CreateEmployee from './CreateEmployee'

function Home() {
  const {login}= useContexter()
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route exact path='/' element={<AdminPanel></AdminPanel>}></Route>
        <Route path='/employee' element={<Employee/>}></Route>
        <Route path='/createEmployee' element={<CreateEmployee/>}></Route>
     </Routes>
    </div>
  )
}

export default Home
