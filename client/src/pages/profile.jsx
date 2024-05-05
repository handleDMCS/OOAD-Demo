import React, { useState } from "react";
import Navbar from "./components/nav_bar";
import Profile_card from "./components/profile_card";
import { useSelector } from "react-redux";
import Admin_navbar from "./components/admin_navbar";

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  const userID = user._id;

  return (
    <div className="flex flex-grow flex-row bg-base-200">
      {
        (user.username != 'admin') ?
        <div className="flex flex-grow pt-2 pr-2 pb-2">
          <Navbar currentPage="Home" showFilter={false}></Navbar>
          <Profile_card 
            view="user" 
            admin 
            userID={userID}
          ></Profile_card>
        </div>
        : 
        <div className="flex flex-grow pt-2 pr-2 pb-2">
          <Admin_navbar currentPage="Admin"></Admin_navbar>
          <Profile_card 
            view="user" 
            admin 
            userID={userID}
          ></Profile_card>
        </div>
      }
    </div>
  );
}
