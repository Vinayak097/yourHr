 import React from 'react'
 import { FaRegBell } from "react-icons/fa";
 import { IoChatboxEllipsesOutline } from "react-icons/io5";
 import { Link } from 'react-router-dom';
 function Navbar() {
   return (
     
        <nav className='flex mx-4 p-5 justify-between border-b'>
          <div>
            <h1 className='text-xl text-blue-500'><Link to={'/'} >YourHr</Link></h1>
          </div>
          <div className=' flex gap-6 items-center   text-2xl'>
            <a className='hover:text-blue-500' href="/profile">Profile</a>
            <a className='hover:text-blue-500' href="">Jobs</a>
            <IoChatboxEllipsesOutline/>
            <FaRegBell></FaRegBell>
            
          </div>
        </nav>
     
   )
 }
 
 export default Navbar