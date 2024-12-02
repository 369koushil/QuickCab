import { useNavigate } from "react-router-dom"

const CaptainProtectedWrapper = ({children}) => {
    const  navigate=useNavigate();
    const token=localStorage.getItem("token");
    if(!token)navigate('/captain-login')
  return (
   <>
   {children}
   </>
  )
}

export default CaptainProtectedWrapper
