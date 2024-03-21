// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Auctions from './pages/auctions'
import Register from './pages/register'
import Login from './pages/login'
import Profile from './pages/profile'
import PublicRoute from './routes/PublicRoute'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile />}></Route>
          {/* items */}
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Auctions />} />
        </Route>
      </Routes>
      {/* <Auctions></Auctions>
      <Login></Login>
      <Register></Register> */}
    </BrowserRouter>
    


  )
}

export default App
