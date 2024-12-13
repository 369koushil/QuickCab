import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainProtectedWrapper = ({children}) => {
    const  navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const token=localStorage.getItem('token');
     const {captain,setCaptain}=useContext(CaptainDataContext);
    useEffect(()=>{

      if(!token){
        navigate('/captain-login')
      }
      axios.get(`${import.meta.env.VITE_BASE_URL}/captains/getcaptainprofile`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then(res=>{
        if(res.status==200){
        
          setCaptain(res.data.captain);
    setLoading(false);
        }
      }).catch(err=>{
        console.log(err);
        localStorage.removeItem('token');
        navigate('/captain-login')
      })
    },[token])

    if(loading){
      return(
        <div>
          Loading...
        </div>
      )
    }
  return (
   <>
   {children}
   </>
  )
}

export default CaptainProtectedWrapper
