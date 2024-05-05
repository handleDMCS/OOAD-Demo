import React from "react";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function admin_navbar({ currentPage = "Admin" }) {
  const refMap = {
		'Home': useRef(null),
    'Admin': useRef(null),
    "Activity-Log": useRef(null),
  };

	const user = useSelector((state) => state.user.user);
	const profileLink = `/profile/${user._id}`;

  useEffect(() => {
    const element = refMap[currentPage].current;
    element.classList.add("bg-neutral");
    element.classList.add("text-neutral-content");
    element.classList.add("rounded-lg");
  }, []);

  return (
    <div className="flex flex-col justify-between w-64 h-screen p-2 flex-shrink-0">
      <ul className="menu bg-base-200 rounded-box">
        <Link to={profileLink}>
          <li id="Home" className="mb-0.5" ref={refMap['Home']}>
						<h2 className='Menu-title mb-0.5'>Home</h2>
          </li>
        </Link>
				<Link to='/admin'>
					<li id="Admin" className="mb-0.5" ref={refMap["Admin"]}>
						<h2 className='Menu-title mb-0.5'>Dashboard</h2>
					</li>
				</Link>
        <Link to='/log'>
					<li id="Activity-Log" ref={refMap["Activity-Log"]}>
						<h2 className='Menu-title mb-0.5'>Activity Log</h2>
					</li>
				</Link>
      </ul>
    </div>
  );
}
