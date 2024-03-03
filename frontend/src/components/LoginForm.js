import React, { useState } from 'react';
import axios from 'axios';
import { useContexter } from '../Contexter';
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setLogin} = useContexter()
  const {setUser} = useContexter()
  const {login} = useContexter()
  const [error,setError] = useState()
  const navigate = new useNavigate()
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    setError('')
    const data = {
      username: username,
      password: password
    }
    event.preventDefault();
    axios.post('http://localhost:8000/login',data).then((res)=>{
      console.log(res.data)
      setLogin(true)
      setUser(username)
      console.log(login)
      navigate('/home')
    }).catch((res)=>{
      setError("Invalid Username or Password")
    })
  };

  return (
    <div className='flex justify-center items-center h-[100vh]'>
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="************"
          value={password}
          onChange={handlePasswordChange}
        />
      <span className='text-sm text-red-500'>{error}</span>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
    </div>
  )}
export default LoginForm;
