import { useEffect ,useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';

const UserProtectedWrapper = ({children}) => {
  const [loading ,setloading]=useState(true);
  const {user,setUser}=useContext(UserDataContext);
    const navigate=useNavigate();
    const token=localStorage.getItem('token');
    useEffect(()=>{
      if(!token){
        navigate('/login')
      }
       axios.get(`${import.meta.env.VITE_BASE_URL}/users/getuserprofile`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then(res=>{
        if(res.status==200){
          console.log(res.data)
          setUser(res.data);
          setloading(false);
        }
      }).catch(err=>{
        console.log(err)
        localStorage.removeItem('token');
        navigate('/login')
      })
    },[token])

    if(loading){
      return(
        <div>Loading...</div>
    )
    }
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper
