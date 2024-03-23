import React from 'react'
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom'
import { logoutStart, logoutFailure, logoutSuccess } from '../redux/slice/userSlice';

export default function profile() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout');
      const data = await res.json()
      if(data.success == false) {

      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      Profile

      <button onClick={handleLogout} type="submit" className="btn btn-primary">Filter</button>
    </div>
  )
}
