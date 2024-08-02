import { useState } from 'react';
import '../App.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import ApiConfig from '../utils/ApiConfig';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { Project } from '../pages/ProjectList';
import { Eye, EyeOff } from 'lucide-react';


interface LoginProps extends Project {
    
    email: string;
    password: string;
}

function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [message, setMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<LoginProps>();
    const { handleLoginAuth } = useAuth();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const onSubmit: SubmitHandler<Project> = async (data: Project) => {
        // console.log(data)
        try {
            const response = await axios.post(ApiConfig.API_LOGIN_URL, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // console.log(response)
            const responseData = await response.data;
            // console.log(responseData.Message)
            if (responseData.Success) {
                setMessage(responseData.Message)
                navigate('/main');
                handleLoginAuth();
            } else {
                setMessage(responseData.Message)
                // console.log(responseData)
            }

        } catch (error:any) {
            if (error.response) {
                console.error('Error response:', error.response.data);
              } else if (error.request) {
                console.error('No response received:', error.request);
              } else {
                console.error('Error setting up request:', error.message);
              }
        }
    };

    return (
        <div className='w-full h-screen bg-white'>
            <div className='w-full h-[60vh]'>
                <div className='hidden md:flex justify-end pr-60 bg-[#044E92] opacity-85 pb-4 rounded-bl-[6rem]'>
                    <img src="Oval.svg" alt="Logo" className="z-10 " />
                </div>
                <div className='block h-[40vh] md:hidden'>
                    <img src="login-bg-1.svg" alt="Logo" className="w-full h-[30vh] object-cover z-10 opacity-85 rounded-bl-[6rem]" />
                </div>
            </div>
            <div className="w-full top-12 md:top-10 mx-auto mt-8 fixed z-10 flex flex-col justify-center items-center">
                <div className="flex justify-center items-center flex-col gap-y-2 bg-transparent mb-28 md:mb-8">
                    <img src="Logo.svg" alt="Logo" className="z-10" />
                    <h2 className='text-white'>Online Project Management</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='bg-white w-full md:w-[30%] py-10 px-12 shadow-none md:shadow-lg rounded-lg'>
                    <h1 className="text-2xl font-medium mb-4">Login to get started</h1>
                    <div className={`form-control w-full ${errors.email ? 'text-red-500' : ''}`}>
                        <label className="label">
                            <span className={`label-text ${errors.email ? 'text-red-500' : ''}`}>Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder=""
                            className={`input input-bordered w-full bg-white  ${errors.email ? 'border-red-500' : ''}`}
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
                        <label className={`input input-bordered flex items-center gap-2 bg-white ${errors.password ? 'border-red-500' : ''}`}>
                            <input type={isPasswordVisible ? "text" : "password"} className={`grow  bg-white `}
                                {...register('password', { required: 'Password is required' })} />

                            {
                                isPasswordVisible ? <Eye onClick={togglePasswordVisibility} /> : <EyeOff onClick={togglePasswordVisibility} />
                            }
                        </label>
                        {errors.password && (
                            <span className="label-text-alt text-red-500">{errors.password.message}</span>
                        )}
                    </div>

                    <div className='my-4 flex justify-end hover:cursor-pointer'>
                        <p className='text-sm text-blue-600 hover:text-700 transition-all'>Forgot Password?</p>
                    </div>

                    <div className='my-4 flex justify-start hover:cursor-pointer md:hidden'>
                <div className='text-red-500 my-2'>{message}</div>
                    </div>
                    <div className='flex justify-center items-center '>
                        <button type="submit" className="btn bg-[#035FB2] hover:bg-[#045FB2] text-white btn-circle mt-6 w-full md:w-1/2 h-[0.5rem]">Login</button>
                    </div>

                <div className='text-center mt-2'>
                    <Link to={"/register"} className='text-center text-sm mt-4'>Don't have an account? <span className='text-blue-600 hover:text-700 transition-all'>Register</span></Link>
                </div>
                </form>
                <div className='text-red-500 my-2 hidden md:block'>{message}</div>
            </div>
        </div>
    );
}

export default Login;
