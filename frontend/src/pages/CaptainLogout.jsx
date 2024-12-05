import React,{useNavigate} from 'react'
import axios from 'axios'

const CaptainLogout = () => {
    
    const token=localStorage.getItem("token");
    const navigate=useNavigate();
    
    axios.post(`${import.meta.env.VITE_API_URL}/captains/logout`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(res=>{
        if(res.status==200){
            localStorage.removeItem('token');
            navigate("/login");
        }
    })

  return (
    <div>
      Captain logout
    </div>
  )
}

export default CaptainLogout
