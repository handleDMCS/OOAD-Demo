import React from 'react'
import { useRef, useEffect } from 'react'

export default function admin_navbar({currentPage='Admin'}) {
    const refMap = {
        'Admin': useRef(null),
        'Activity-Log': useRef(null),
    }

    useEffect(() => {
        const element = refMap[currentPage].current;
        element.classList.add('bg-neutral')
        element.classList.add('text-neutral-content')
        element.classList.add('rounded-lg')
    }, [])

  return (
    <div className="flex flex-col justify-between w-64 h-screen p-2 flex-shrink-0">
        <ul className="menu bg-base-200 rounded-box">
            <li className='mb-0.5'><a>Home</a></li>
            <li className='mb-0.5' ref={refMap['Admin']} ><a>Admin</a></li>
            <li ref={refMap['Activity-Log']}><a>Activity log</a></li>
        </ul>      
    </div>
  )
}
