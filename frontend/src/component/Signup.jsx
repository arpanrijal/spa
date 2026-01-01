import axios from 'axios';
import React, { useState, useRef, useEffect, useContext } from 'react'
import { NavLink, useNavigate } from "react-router";
import { UserDataContext } from '../context/DataContext';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [startfetch, setStartFetch] = useState(false)
    const { savedata, setSaveData, setStartFetchTOKEN } = useContext(UserDataContext)
    const navigate = useNavigate()
    const inputHandler = (e) => {
        e.preventDefault();
        setStartFetch(true)
    }
    useEffect(() => {
        if (!startfetch) return
        const registerUser = async () => {
            try {
                const response = await axios.post('http://localhost:3000/register', ({ email, password }),{withCredentials: true})
                if (response.data.success) {
                    setSaveData(response.data.userData)
                    navigate('/')
                }
                if (!response.data.success) {
                    throw new Error("Something went wrong: ", message)
                }
                navigate('/')
            } catch (error) {
                console.error(error);
            } finally {
                setStartFetch(false)
                setEmail("")
                setPassword("")
            }
        }
        registerUser()
    }, [startfetch])
    return (
        <>
            <div className='w-[100 dvw] h-screen flex justify-center items-center bg-[#121212]'>
                <form className='rounded-2xl bg-[#1e1e1e] flex-col flex  w-[35%] gap-5 p-5' onSubmit={inputHandler}>
                    <div className='flex gap-1 flex-col'>
                        <h2 className='text-2xl font-bold' >Hello There!</h2>
                        <p className='text-sm'>Create your New account</p>
                    </div>
                    <input
                        value={email}
                        required
                        type="email"
                        className='p-3 border rounded-2xl bg-blue-200 text-black focus:bg-gray-100 focus:outline-0'
                        placeholder='Email'
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <input
                        required
                        value={password}
                        type="password"
                        className='p-3 border rounded-2xl bg-blue-200 text-black focus:bg-gray-100 focus:outline-0'
                        placeholder='Password'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <div className='flex flex-col items-center gap-1 mt-4'>
                        <button type='submit'
                            className='p-3 bg-blue-400 w-full rounded-2xl text-xl font-semibold cursor-pointer text-white'
                        >Create your New Account</button>
                        <p>Already have an Account? <span className='text-blue-800 underline font-semibold cursor-pointer'><NavLink to="/login">Login Here</NavLink></span></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login