import React, { useEffect, useState } from 'react'
import { RiEditFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { Button, Modal } from 'antd';
import './Hero.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, postUsers, deleteUsers } from '../app/user/UserSlice';
import Loadingg from './Loadingg';
const Hero = ({ data }) => {
  const [post, setpost] = useState(false)
  const { loading, users, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    group: ''
  })


  useEffect(() => {
    dispatch(fetchUsers())
  }, [post])

  const handlePost = (e) => {
    e.preventDefault();
    dispatch(postUsers(user))
    setUser({
      name: '',
      username: '',
      email: '',
      group: ''
    });
    setpost(!post)
    setOpen(false)
  }

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
  const handleDeleteUser = (id) => {
    dispatch(fetchUsers())
    dispatch(deleteUsers(id));
    console.log(id);
  };





  const [search, setSearch] = useState('')



  // const searchMethod = (e) => {
  //   const term = e.target.value;
  //   setSearch(term)
  //   const results = data.filter(item =>
  //     item.name.toLowerCase().includes(term.toLowerCase())
  //   );
  //   setSearchResult(results);
  // }

  return (
    <div className='Hero'>
      <div className='searchandfilter'>
        <div className='search'>
          <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search . . .' />
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
              <th>Action</th>
            </tr>
          </thead>

          {loading ? <h2 className=""><Loadingg /></h2> : null}
          {error ? <h3 className="">{error}</h3> : null}
          {users ? users.filter((pr) => {
            if (search === '') {
              return pr
            } else if (pr.name.toLowerCase().includes(search.toLowerCase())) {
              return pr
            }
          })

            .map((s, index) => (
              <tbody className="table">
                <tr key={s.id}>
                  <td> {index + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.username}</td>
                  <td>{s.email}</td>
                  <td>{s.group}</td>
                  <td >
                    <div className='editdelete'>
                      <button className='button1'>Edit</button>
                      <button className='button2' onClick={() => handleDeleteUser(users[index].id)} >Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))
            : null}



        </table >
      </div>

      <Modal className='modal'
        open={open}
        title="Add a student"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          // <Button key="submit" type="primary" loading={loadings} onClick={handleOk} >

          //   Submit
          // </Button>,
          <Button key="submit" type='primary' loading={loadings} onClick={handlePost}  >

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
        <div className='inputandselect'>
          <div className='hit'>
            <div className='name'>
              <h3>Name</h3>
              <input type="text" placeholder='Name...'
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })} />
            </div>
            <div className='username'>
              <h3>Username</h3>
              <input type="text" placeholder='Username...'
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })} />
            </div>
          </div>
          <div className='git'>
            <div className='email'>
              <h3>Email</h3>
              <input type="email" placeholder='Email...'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </div>
            <div className='last'>
              <h3>Select a goup</h3>
              <select
                value={user.group}
                onChange={(e) => setUser({ ...user, group: e.target.value })}>
                <option value="All">All</option>
                <option value="IELTS">IELTS</option>
                <option value="FRONTEND">FRONTEND</option>
                <option value="BACKEND">BACKEND</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>

    </div >
  )
}

export default Hero;