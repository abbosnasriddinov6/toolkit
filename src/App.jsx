import React from 'react'
import './scss/main.scss'
import Hero from './components/Hero'
import Loadingg from './components/Loadingg'
const App = () => {

  const data = [
    { name: '' },
    { username: '' },
    { email: '' }
  ]
  return (
    <div className='whole'>
      <div className='container'>
        <Hero data={data} />
      </div>
    </div>
  )
}

export default App