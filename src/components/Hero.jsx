import React, { useEffect, useState } from 'react'
import './Hero.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../app/user/UserSlice';
import Loadingg from './Loadingg';
const Hero = () => {
  const { loading, users, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div className='Hero'>
      <div className='searchandfilter'>
        <div className='search'>
          <input type="text" placeholder='Search . . .' />
        </div>
        <div className='filteradd'>
          <select>
            <option value="All">All</option>
            <option value="IELTS">IELTS</option>
            <option value="FRONTEND">FRONTEND</option>
            <option value="BACKEND">BACKEND</option>
          </select>
          <button>Add</button>
        </div>
      </div>
      <div className='result'>


        <table >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Group</th>
            </tr>
          </thead>

          {loading ? <h2 className=""><Loadingg /></h2> : null}
          {error ? <h3 className="">{error}</h3> : null}
          {users.length > 0 ? (
            <tbody className='table'>
              {users.map((user) => (

                <tr key={user.id} >
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.group}</td>
                </tr>
              ))
              }
            </tbody >
          ) : null}



        </table >
      </div>
    </div >
  )
}

export default Hero