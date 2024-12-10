import { Route,Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptainSignup from "./pages/CaptainSignup"
import CaptainLogin from "./pages/CaptainLogin"
import Home from "./pages/Home"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/userlogin" element={<UserLogin />}></Route>
        <Route path="/usersignup" element={<UserSignup />}></Route>
        <Route path="/captainsignup" element={<CaptainSignup />}></Route>
        <Route path="/captainlogin" element={<CaptainLogin />}></Route>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App