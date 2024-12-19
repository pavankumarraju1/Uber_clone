import { Route,Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptainSignup from "./pages/CaptainSignup"
import CaptainLogin from "./pages/CaptainLogin"
import Home from "./pages/Home"
import UserProtectedWrapper from "./pages/UserProtectedWrapper"
import UserLogout from "./pages/UserLogout"
import CaptainHome from "./pages/CaptainHome"
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper"
import CaptainLogout from "./pages/CaptainLogout"
import RidingUser from "./pages/RidingUser"
import CaptainRidingShowingDirections from "./pages/CaptainRidingShowingDirections"

import 'remixicon/fonts/remixicon.css'
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/userlogin" element={<UserLogin />}></Route>
        <Route path="/usersignup" element={<UserSignup />}></Route>

        <Route path="/ridinguser" element={<RidingUser />}></Route>

        <Route path="/captainsignup" element={<CaptainSignup />}></Route>
        <Route path="/captainlogin" element={<CaptainLogin />}></Route>

        <Route path="/ridingcaptain" element={<CaptainRidingShowingDirections />}></Route>

        <Route path="/home" element={<UserProtectedWrapper><Home/></UserProtectedWrapper>} />
        <Route path="/user/logout" element={<UserProtectedWrapper><UserLogout /></UserProtectedWrapper>}></Route>

        <Route path="/captainHome" element={<CaptainProtectedWrapper><CaptainHome /></CaptainProtectedWrapper>}></Route>
       <Route path="/captain/logout" element={<CaptainProtectedWrapper><CaptainLogout></CaptainLogout></CaptainProtectedWrapper>}></Route>
        
      </Routes>
    </>
  )
}

export default App