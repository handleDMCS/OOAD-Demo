// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Auctions from './pages/auctions'
import Auction_room from './pages/auction_room'
import Register from './pages/register'
import Login from './pages/login'
import Profile from './pages/profile'
import PublicRoute from './routes/PublicRoute'
import NotFound from './pages/notfound'
import My_items from './pages/my_items'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/items/my' element={<My_items />}></Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Auctions />} />
          <Route path='/room/:id' element={<Auction_room />}></Route>
        </Route>

        <Route path='*' element={<NotFound />} />
        
      </Routes>
    </BrowserRouter>
    


  )
}

export default App
