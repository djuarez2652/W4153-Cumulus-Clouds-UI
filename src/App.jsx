import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ServiceButton from './Components/ServiceButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src='/src/assets/muselink.svg'></img>
      <h1>MuseLink</h1>
      
      <ServiceButton>Search Gigs</ServiceButton>
      <ServiceButton>Schedule</ServiceButton>
      <ServiceButton>Book & Pay</ServiceButton>
          
    </>
  )
}

export default App
