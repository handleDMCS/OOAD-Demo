import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/nav_bar';

import {
  logoutStart,
  logoutSuccess,
  logoutFailure
} from '../redux/slice/userSlice';

export default function Profile () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      dispatch(logoutStart());
      const res = await fetch ('/api/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (data.success == false) {
        dispatch(logoutFailure(data.msg));
      } 
      dispatch(logoutSuccess(data));
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-grow flex-row bg-base-200">
      
      <Navbar currentPage='Home'></Navbar>   
      
      <span>
        Profile

        <button onClick={handleLogout} type="submit" className="btn btn-primary">Logout</button>
      </span>
    </div>
  )
}