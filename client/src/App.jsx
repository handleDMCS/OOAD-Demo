import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auctions from './pages/auctions'
import Register from './pages/register'
import Login from './pages/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Auctions></Auctions>
    // <Login></Login>
    // <Register></Register>
  )
}

export default App
