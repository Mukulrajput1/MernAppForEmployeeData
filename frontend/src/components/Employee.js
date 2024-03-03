import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Buffer } from "buffer";

function Employee() {
    
    const [employees,setEmployees] = useState([])
    const renderImage = (blob) => {
        const base64String = Buffer.from(blob.data).toString('base64')
        const imageUrl = `data:${blob.type};base64,${base64String}`
        return imageUrl
    }
    const onDelete = (email) =>{
        const data = {email:email}
        axios.post("http://localhost:8000/delete",data ).then((res)=>{
            alert("data deleted successfully")
        })
        fetchData()
    }
    useEffect(() => {
      fetchData()

    }, [])
    const fetchData =() =>{
        axios.get("http://localhost:8000/employee").then((res)=>{
          setEmployees(res.data)
          
        //   const url = `data:image/jpeg;base64,${Buffer.from(blob).toString('base64')}`;
          console.log(employees)
      }).catch(()=>{
        console.log("error")
      })
    }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map(employee => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap">{employee.f_id}</td>
              <td className="px-6 py-4 whitespace-nowrap"><img className='w-12 h-12' src={renderImage(employee.f_image)}></img></td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.f_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.f_email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.f_mobile}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.f_designation}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.f_gender}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.f_course}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.f_createdate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-indigo-600 hover:text-indigo-900" onClick={() =>{}}>Edit</button>
                <button className="text-red-600 hover:text-red-900 ml-2" onClick={()=>onDelete(employee.f_email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Employee
