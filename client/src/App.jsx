import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auctions from './pages/auctions'
import Register from './pages/register'
import Login from './pages/login'
import Auction_room from './pages/auction_room'
import My_items from './pages/my_items'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Auction_room></Auction_room>
    // <Auctions></Auctions>
    // <Login></Login>
    // <Register></Register>
    // <My_items></My_items>
  )
}

export default App
