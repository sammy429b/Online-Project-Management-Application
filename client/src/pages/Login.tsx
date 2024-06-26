import { useState } from 'react';
import '../App.css';
import { useForm } from 'react-hook-form';
import ApiConfig from '../utils/ApiConfig';
import axios from 'axios';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios.post(ApiConfig.API_LOGIN_URL, data);
            const responseData = await response.data;
            console.log(ApiConfig.API_LOGIN_URL)
            console.log(responseData)
            if (data.Success === true) {
                setError('Login Successful');
            } else if(data.Success === false) {
                setError('Invalid creadentials');
            }
        } catch (error) {
            setError('Invalid creadentials');
        }
    };

    return (
        <div className='w-full h-screen'>
            <div className='w-full h-[60vh]'>
                <div className='hidden md:flex justify-end pr-60 bg-[#044E92] opacity-85 pb-4 rounded-bl-[6rem]'>
                    <img src="Oval.svg" alt="Logo" className="z-10 " />
                </div>
                <div className='block h-[40vh] md:hidden'>
                    <img src="login-bg-1.svg" alt="Logo" className="w-full z-10 opacity-85" />
                </div>
            </div>
            <div className="w-full top-0 md:top-10 mx-auto mt-8 fixed z-10 flex flex-col justify-center items-center">
                <div className="flex justify-center items-center flex-col gap-y-2 bg-transparent mb-8">
                    <img src="Logo.svg" alt="Logo" className="z-10" />
                    <h2 className='text-white'>Online Project Management</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-white w-[90%] md:w-[30%] py-10 px-12 shadow-none md:shadow-lg rounded-lg'>
                    <h1 className="text-2xl font-bold mb-4">Login to get started</h1>
                    <div className={`form-control w-full ${errors.email ? 'text-red-500' : ''}`}>
                        <label className="label">
                            <span className={`label-text ${errors.email ? 'text-red-500' : ''}`}>Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder=""
                            className={`input input-bordered w-full ${errors.email ? 'border-red-500' : ''}`}
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && (
                            <span className="label-text-alt text-red-500">{errors.email.message}</span>
                        )}
                    </div>
                    <div className={`form-control w-full mt-2 ${errors.password ? 'error' : ''}`}>
                        <label className="label">
                            <span className={`label-text ${errors.password ? 'text-red-500' : ''}`}>Password</span>
                        </label>
                        <label className={`input input-bordered flex items-center gap-2 ${errors.password ? 'border-red-500' : ''}`}>
                            <input type="password" className={`grow `}
                                {...register('password', { required: 'Password is required' })} />

                            <img src="hide-password.svg" alt="" />
                        </label>
                        {errors.password && (
                            <span className="label-text-alt text-red-500">{errors.password.message}</span>
                        )}
                    </div>

                    <div className='my-4 flex justify-end hover:cursor-pointer'>
                        <p className='text-sm text-blue-600 hover:text-700 transition-all'>Forgot Password?</p>
                    </div>
                    <div className='flex justify-center items-center '>
                        <button type="submit" className="btn bg-[#035FB2] hover:bg-[#045FB2] text-white btn-circle mt-6 w-full md:w-1/2 h-[0.5rem]">Login</button>
                    </div>
                </form>
                <div className='text-red-500 my-4'>{error}</div>
            </div>
        </div>
    );
}

export default Login;
