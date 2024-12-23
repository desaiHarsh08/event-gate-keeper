import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import gatekeeperImage from '../assets/gatekeeper-img.jpg'
import Loading from './Loading';

const Home = () => {

    const host = "http://localhost:5001";
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleClick = (e) => {
        const visibility = document.getElementById('visibility')
        const password = document.getElementById('password');
        if (visibility.innerHTML === 'visibility') {
            visibility.innerHTML = 'visibility_off'
            password.setAttribute('type', 'password');
        }
        else {
            visibility.innerHTML = 'visibility'
            password.setAttribute('type', 'text');
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('fired')
        setLoading(true);
        const res = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'desaiharsh183@gmail.com',
                password: document.getElementById('password').value
            })
        });
        const data = await res.json();
        setLoading(false);
        localStorage.setItem('auth-token', data.authToken);
        navigate('/settings', { replace: true });
    }
    return (
        <>
            {loading === true ? <Loading /> : ''}
            <div className=' h-[85vh] flex justify-center items-center'>
                <div className='w-3/4 h-full py-12'>
                    {/* <h1 className='text-xl flex flex-col items-center font-semibold'>
                <span>Welcome</span>
                <span>to</span>
                <span className='text-2xl'>Event Gatekeeper - Settings</span>
            </h1> */}
                    <div className='flex justify-center'>
                        <img src={gatekeeperImage} alt="gatekeeperImage" className='h-56 object-contain rounded-full' />
                    </div>
                    <h1 className='text-2xl text-center font-medium my-7 '>Welcome Back!</h1>
                    <form className='flex justify-center flex-col items-center gap-5' onSubmit={handleSubmit}>
                        <div className="password flex items-center border-2 border-slate-400  rounded-md">
                            <label htmlFor="password"></label>
                            <input type="password" name="password" id="password" className='outline-none px-4 py-2 ' />
                            <button type='button'>
                                <span class="material-symbols-outlined text-slate-400" id='visibility' onClick={handleClick}>
                                    visibility_off
                                </span>
                            </button>
                        </div>
                        <div className="btn_submit">
                            <button className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md '>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Home
