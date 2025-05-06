import React from 'react'
import Logo from "../../assets/images/Logo.jpg";
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='bg-white sm:p-7 px-3 py-4 flex flex-col  justify-center gap-4 h-[100dvh]'>
            <div>
                <img src={Logo} alt="" className='xl:w-[130px] xl:h-[97px] xl:max-w-[130px] md:w-[100px] md:h-[97px] md:max-w-[100px] w-[80px]  max-w-[80px] object-contain' />
            </div>
            <form action="/dashboard">
                <h5 className='text-[var(--primary)] font-medium text-2md'>Welcome to S-H Steel! 👋🏻</h5>
                <p className='text-[#2E263DB2]'>Please sign-in to your account and start the adventure</p>
                <div className='mt-3'>
                    <input type="email" name="" id="" className='border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm w-full' placeholder='Email' />
                </div>
                <div className='mt-3 border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm flex items-center justify-between w-full'>
                    <input type={showPassword ? "text" : "password"} name=""
                        id=""
                        className=''
                        placeholder='Password'
                    />
                    {showPassword ? (
                        <RiEyeOffLine
                            className="text-xl cursor-pointer text-[#88191F]"
                            onClick={togglePasswordVisibility}
                        />
                    ) : (
                        <RiEyeLine
                            className="text-xl cursor-pointer"
                            onClick={togglePasswordVisibility}
                        />
                    )}
                </div>
                <div className='flex items-center justify-between mt-3'>
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" name="" id="" className='accent-[#88191F] text-[15px]' />
                        <label htmlFor="" className='text-[var(--primary)]'>Remember me</label>
                    </div>
                    <Link to="" className='text-[#88191F] font-normal text-[15px]'>Forgot Password?</Link>
                </div>
                <div className='mt-9'>
                    <button className='bg-[#88191F] text-white px-4 py-2 rounded-sm w-full text-medium text-sm'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login