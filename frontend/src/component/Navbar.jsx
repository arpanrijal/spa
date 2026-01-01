import { FiBell, FiChevronDown } from "react-icons/fi";
import "./Navbar.css";
import { UserDataContext } from '../context/DataContext'
import { useContext, useState, useEffect } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
function Navbar() {
  const { savedata, setNavProfilecard, NavProfilecard } = useContext(UserDataContext)
  const [Profilepic, setProfilepic] = useState(null);
  const navigate = useNavigate()
  const [handleLogout, sethandleLogout] = useState(false)

  useEffect(() => {
    const getProfilePic = async () => {
      try {
        const res = await axios.get("https://randomfox.ca/floof/");
        setProfilepic(res.data.image);
      } catch (error) {
        console.error("Failed to load anime image", error);
      }
    };
    getProfilePic();
  }, []);
  useEffect(()=>{
    const handleLogOut = async ()=>{
      if (!handleLogout) return
      try {
        const res = await axios.get('http://localhost:3000/logout',{withCredentials:true})
        navigate('/login')
      } catch (error) {
        navigate('/login')
        throw new Error("Something went wrong: ", error)
      }
      sethandleLogout(false)
      setNavProfilecard(false)
      return
    }
    handleLogOut();
  },[handleLogout])
  
  return (
    <nav className="navbar relative" onClick={() => setNavProfilecard(false)}>
      <div className="left select-none">
        <div>
          <h2 className="title">NEPSE Stock Trading</h2>
          <p className="subtitle">Trading Signals</p>
        </div>
      </div>
      <div className="icons">
        <FiBell size={20} color="#d1d5db" />
        <div className="bg-gray-800 rounded-xl py-2 px-1 flex justify-center items-center gap-1 cursor-pointer select-none" 
        onClick={(e) =>{ 
          e.stopPropagation()
          setNavProfilecard(prev => !prev)
        }}>
           <img
            src={Profilepic}
            alt="anime avatar"
            className="w-8 h-8 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col leading-none pl-1">
            <span className="font-bold">{savedata.email}</span>
            <span className="font-normal">{savedata.username}</span>
          </div>
          <FiChevronDown size={20} color="#d1d5db"/>
        </div>
        {NavProfilecard && (
          <div className="w-auto h-auto  pt-2.5 pb-5 px-5 rounded-2xl bg-gray-800 absolute top-11/12 right-6 flex justify-center items-center flex-col" onClick={(e) => e.stopPropagation()}>
            <img src={Profilepic} alt="anime avatar" className="rounded-[100%] border border-amber-400 object-cover bg-indigo-200 w-32 h-32 my-2"/>
            <div className="w-full p-1 justify-start pb-5">
              <h3 className="font-bold">Username: <span className="font-normal">{savedata.username}</span></h3>
              <h3 className="font-bold">Email: <span className="font-normal">{savedata.email}</span></h3>
            </div>
            <button className="py-2 px-20 font-semibold text-white bg-red-400 rounded-2xl cursor-pointer" onClick={()=> sethandleLogout(true)}>Log Out</button>
          </div>
        )}
      </div>
    </nav>
  );
}



export default Navbar;
