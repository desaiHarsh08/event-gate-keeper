import React, { useRef, useState } from 'react'
import Loading from './Loading'

const Home = () => {

    const host = process.env.REACT_APP_BACKEND_URL;

    const rfidInputRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(null);
    // eslint-disable-next-line
    const [flag, setFlag] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rfid = document.getElementById('rfid').value;


        setData(null);
        if (rfid === '') {
            alert("Invalid RFID...!");
            return;
        }
        else {
            setLoading(true);
            const res = await fetch(`${host}/api/student/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rfid })
            });
            setLoading(false);
            if (!res.ok) {
                // alert(`${rfid} - NOT ALLOWED`);
                setData(null)
                console.log(rfid)
                // return;
            }
            else {
                const data = await res.json();
                console.log(data)
                setData(data);
            }
            const form = document.getElementById('form');
            const heading = document.getElementById('heading');
            const display = document.getElementById('display');
            setTimeout(() => {
                heading.classList.toggle('hidden');
                form.classList.toggle('hidden');
                display.classList.toggle('hidden');
                rfidInputRef.current.focus();
            }, 3000);
            heading.classList.toggle('hidden');
            form.classList.toggle('hidden');
            display.classList.toggle('hidden');
        }

        document.getElementById('rfid').value = '';

    }
    return (
        <>
            {loading === true ? <Loading /> : ''}

            <div className='h-[85vh] w-full flex justify-center items-center '>
                <div className=" w-3/4 h-3/4  flex flex-col justify-center transition-all ">
                    {/* Heading */}
                    <h1 className='my-3 font-medium text-xl uppercase ' id='heading'>Enter the RFID to check for student's status</h1>
                    {/* Form for search */}
                    <form onSubmit={handleSubmit} id='form'>
                        <div className="my-3 rfid">
                            <label htmlFor="rfid"></label>
                            <input ref={rfidInputRef} autoFocus type="text" name="rfid" id="rfid" className='border border-slate-500 px-4 py-2 w-full rounded-md focus-within:outline-blue-300 focus:border-blue-300 ' />
                        </div>
                        <div className="btn">
                            <button type='submit' className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md '>Search</button>
                        </div>
                    </form>
                    {/* Display the data */}
                    <div id='display' className='hidden w-full '>
                        {
                            data !== null ?
                                <div className=' flex flex-col my-7 items-center '>
                                    <div className=' font-medium  inline text-center '>
                                        {/* <span className='block my-1 text-xl'>RFID: {data?.rfid}</span> */}
                                        <span className='block my-3 text-2xl'>{data?.student.event !== null ? data?.student?.event : ''}</span>
                                        <span className='block my-3 text-2xl'>{data?.student?.name !== null ? data?.student?.name : ''}</span>
                                        <div className='my-4' >
                                            {data?.isAlreadyMarked === false ? (
                                                data.student.allowed == true ? (
                                                    <span className='text-2xl px-4 py-2 rounded-full bg-green-500'>ALLOWED</span>
                                                ) : (
                                                    <p className={`text-3xl px-4 font-bold rounded-full border border-red-500 p-2 text-red-500`}>
                                                        <span>NOT REGISTERED</span>
                                                    </p>
                                                )
                                            ) : (
                                                <div className='flex flex-col items-center gap-3'>
                                                    <p>
                                                        <span className='text-2xl px-4 py-2 rounded-full bg-yellow-500'>ALREADY ALLOWED</span>
                                                    </p>
                                                    {!data?.student.allowed == true && <p className={`text-3xl px-4 font-bold rounded-full border border-red-500 p-2 text-red-500`}>
                                                        <span>NOT REGISTERED</span>
                                                    </p>}
                                                </div>
                                            )}


                                            {/*<span className={`text-2xl px-4 py-2 rounded-full ${data?.isAlreadyMarked === false ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>{data?.isAlreadyMarked === false ? "ALLOWED" : "ALREADY ALLOWED"}</span> */}



                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="flex justify-center align-items-center">
                                    <p className={`text-3xl px-4 font-bold rounded-full border border-red-500 p-2 text-red-500`}>
                                        <span>NOT A STUDENT - </span>
                                        <span className='ml-2 text-red-500 text-3xl'>X</span>
                                    </p>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home


/*
<table className='w-full my-5'>
                <thead >
                  <tr className='border-2 border-black'>
                    <td className='w-1/3 py-2 border-r-2 border-black text-center font-medium bg-slate-100'>Name</td>
                    <td className='w-1/3 py-2 border-r-2 border-black text-center font-medium bg-slate-100'>RFID</td>
                    <td className='w-1/3 py-2 border-r-2 border-black text-center font-medium bg-slate-100'>Event</td>
                    
                    </tr>
                    </thead>
                    <tbody>
                      <tr className='border-2 border-black'>
                        <td className='w-1/3 py-2 border-r-2 border-black text-center'>{data?.name}</td>
                        <td className='w-1/3 py-2 border-r-2 border-black text-center'>{data?.rfid}</td>
                        <td className='w-1/3 py-2 border-r-2 border-black text-center'>{data?.event}</td>
                        
                      </tr>
                    </tbody>
                  </table>
*/