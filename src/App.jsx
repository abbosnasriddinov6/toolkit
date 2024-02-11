import React from 'react'
import './scss/main.scss'
import Hero from './components/Hero'
import Loadingg from './components/Loadingg'
import OpenModal from './components/OpenModal'
const App = () => {
  return (
    <div className='whole'>
      <div className='container'>
        <Hero />
        {/* <OpenModal /> */}
      </div>
    </div>
  )
}

export default App