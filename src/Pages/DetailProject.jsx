import React from 'react'
import dummyuser from "../assets/images/dummy-user.png";
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import OrderTable from '../components/DetailProject/OrderTable';
import DaysTable from '../components/DetailProject/DaysTable';

const DetailProject = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <div className='bg-white shadow-md rounded-lg'>
                <div className='grid lg:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-4 p-3'>
                    <div>
                        <input type="text" placeholder='Search Order' className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]" />
                    </div>
                    <div>
                        <input type="date" placeholder='Search by date' className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]" />
                    </div>
                </div>
                <div className='bg-[#00000026]'>
                    <div className='flex items-center gap-4 sm:p-4 p-2'>
                        <div>
                            <FaArrowLeft className='bg-white sm:p-2 p-1 sm:text-4xl text-2xl rounded-lg cursor-pointer' onClick={()=>navigate('/completedproject')} />
                        </div>
                        <div className='flex gap-3 items-center w-full'>
                            <div>
                                <img className="sm:size-12 size-8 sm:max-w-12 max-w-8 rounded-full" src={dummyuser} alt="img" />
                            </div>
                            <div className="sm:flex items-center justify-between gap-2 w-full">
                                <div>
                                    <p className="font-medium sm:text-3xl text-lg">Cristine Easom</p>
                                    <p className="sm:text-sm text-xs text-[#2E263DB2]">ceasomw@theguardian.com</p>
                                </div>
                                <p className='md:text-2xl sm:text-lg text-xs font-medium' >May 2, 2025 - May 9, 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
                <OrderTable/>
                <div className='bg-[#00000026] py-3 px-6 mt-5'>
                    <h4 className='text-2xl font-medium'>Days</h4>
                </div>
                <DaysTable/>
            </div>
        </div>
    )
}

export default DetailProject