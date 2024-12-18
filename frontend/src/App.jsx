import { Route ,Routes} from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import Riding from './pages/Riding'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import UserLogout from './pages/UserLogout'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainRiding from './pages/CaptainRiding'
function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Start/>} />
      <Route path='/riding' element={<Riding />} />
      <Route path='/captain-riding' element={<CaptainRiding />} />

      <Route path='/home' element={<UserProtectedWrapper><Home/></UserProtectedWrapper>}/>
      <Route path='/login' element={<UserLogin/>} />
      <Route path='/signup' element={<UserSignup/>} />
      <Route path='/riding' element={<Riding />} />
      <Route path='/captain-login' element={<Captainlogin/>} />
      <Route path='/captain-signup' element={<CaptainSignup/>} />
      <Route path='/captain-home' element={<CaptainProtectedWrapper><CaptainHome/></CaptainProtectedWrapper>}/>
      <Route path='/captain-logout' element={<CaptainProtectedWrapper><CaptainLogout/></CaptainProtectedWrapper>}/>
      <Route path='/user-logout' element={<UserProtectedWrapper><UserLogout/></UserProtectedWrapper>}/>
     </Routes>
    </>
  )
}

export default App
