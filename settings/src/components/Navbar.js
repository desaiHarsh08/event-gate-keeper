import React  from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {

  let navigate = useNavigate();
  let location = useLocation();
// console.log(location.pathname)
  const handleLogout = (e) => {
    localStorage.clear();
    navigate('/', { replace: true });
  }

  return (
    <header className='w-full'>
      <nav className='h-[92px] sm:h-[8vh] w-full p-3 px-4 bg-blue-500 text-white font-medium flex justify-between  items-center '>
        <div id="left">
            <p  className='hover:text-slate-200 '>
                <span className='text-xl'>@Event_Gatekeeper</span>
            </p>
        </div>
        <div id="right">
          {
          (location.pathname.endsWith('/settings')) ? <button onClick={handleLogout} className='px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md border border-red-800'>Logout</button>
          :''
          }
        </div>
      </nav>
    </header>
  )
}

export default Navbar
