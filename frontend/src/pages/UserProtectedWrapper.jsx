import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const UserProtectedWrapper = ({children}) => {
    const navigate=useNavigate();
    const token=localStorage.getItem('token');
    useEffect(()=>{
      if(!token){
        navigate('/login')
      }
    })
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper
