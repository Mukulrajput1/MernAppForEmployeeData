import React from 'react'
import {Link} from 'react-router-dom'
import { useContexter } from '../Contexter';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const {user} = useContexter()
    const {setUser} = useContexter()
    const {setLogin} = useContexter()
    const navigate = new useNavigate()

    const logout = () =>{
        setLogin(false)
        setUser('')
        navigate('/')
        
    }
  return (
    <div className='h-16 flex items-center bg-gray-700 px-20 '>
      <div className='text-white space-x-10 w-1/2'>
        <Link to='/home/' className='hover:bg-gray-300 py-2 px-4 rounded-md'>
            Home
        </Link>
        <Link to='/home/createEmployee' className='hover:bg-gray-300 py-2 px-4 rounded-md'>
            Create Employee
        </Link>
        <Link to='/home/employee' className='hover:bg-gray-300 py-2 px-4 rounded-md'>
            Employee list
        </Link>
      </div>
      <div className='flex justify-end text-white w-1/2'>
        <div><span className='capitalize'>{user}</span>-
            <button className='hover:text-blue-500' onClick={logout}>
                Logout
            </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
