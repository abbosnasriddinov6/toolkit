import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd';
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

  const [loadings, setLoadings] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

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
          <button onClick={showModal}>Add</button>
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

      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loadings} onClick={handleOk}>
            Submit
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            loading={loadings}
            onClick={handleOk}
          >
            Search on Google
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div >
  )
}

export default Hero