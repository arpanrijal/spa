import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { NavLink } from "react-router";
import axios from 'axios'
import { useNavigate } from 'react-router';
import { UserDataContext } from '../context/DataContext';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [startfetch, setStartfetch] = useState(false)//datafetch/send garnalai
    const { savedata, setSaveData, setStartFetchTOKEN } = useContext(UserDataContext)
    const navigate = useNavigate()

    const inputHandler = (e) => {
        e.preventDefault();
        setStartfetch(true)
    }

    useEffect(() => {
        if (!startfetch) return;
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/login', ({ email, password }),{withCredentials: true})
                //yo remove navar {withCredentials: true, credentials: 'include'}
                if (response.data.success) {
                    setSaveData(response.data.userData)
                    navigate('/')
                }
            } catch (error) {
                console.error(error);
            } finally {
                setStartfetch(false)
                setEmail("")
                setPassword("")
            }
        }
        fetchData();
    }, [startfetch])
    return (
        <>
            <div className='w-[100 dvw] h-screen flex justify-center items-center bg-[#121212]'>
                <form className='rounded-2xl bg-[#1e1e1e] flex-col flex  w-[35%] gap-5 p-5' onSubmit={inputHandler}>
                    <div className='flex gap-1 flex-col'>
                        <h2 className='text-2xl font-bold' >Welcome Back!</h2>
                        <p className='text-sm'>Enter your account details</p>
                    </div>
                    <input
                        value={email}
                        required
                        type="email"
                        className='p-3 border rounded-2xl bg-blue-50 focus:bg-gray-100 focus:outline-0'
                        placeholder='Email'
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <input
                        required
                        value={password}
                        type="password"
                        className='p-3 border rounded-2xl bg-blue-50 focus:bg-gray-100 focus:outline-0'
                        placeholder='Password'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <div className='flex flex-col items-center gap-1 mt-4'>
                        <button type='submit'
                            className='p-3 bg-blue-400 w-full rounded-2xl text-xl font-semibold cursor-pointer text-white'
                        >Log In</button>
                        <p>Don't have an Account? <span className='text-blue-800 underline font-semibold cursor-pointer'><NavLink to="/signup">Create a New Account</NavLink></span></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login