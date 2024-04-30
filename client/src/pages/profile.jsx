import React, { useState } from "react";
import Navbar from "./components/nav_bar";
import Profile_card from "./components/profile_card";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  const userID = user._id;

  return (
    <div className="flex flex-grow flex-row bg-base-200">
      <Navbar currentPage="Home" showFilter={false}></Navbar>
      <div className="flex flex-grow pt-2 pr-2 pb-2">
        <Profile_card 
          view="user" 
          admin 
          userID={userID}
        ></Profile_card>
      </div>
    </div>
  );
}
