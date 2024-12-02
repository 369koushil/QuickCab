import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const CaptainProtectedWrapper = ({children}) => {
    const  navigate=useNavigate();
    const token=localStorage.getItem("token");
    useEffect(()=>{
      if(!token){
        navigate('/captain-login')
      }
    })
  return (
   <>
   {children}
   </>
  )
}

export default CaptainProtectedWrapper
