import { useNavigate } from "react-router-dom";


const UserProtectedWrapper = ({children}) => {
    const navigate=useNavigate();
    const token=localStorage.getItem('token');
    if(!token)navigate('/userlogin')
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper
