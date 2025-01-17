import HeaderTop from "./headerTop";
import SideBar from "./sideBar";
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate();

    const goLogin = () =>{
        navigate('/login')
    }

    const goRegister = () => {
        navigate('/register')
    }

    return (<div>
        <div className="header-container">
            <p>Lingwit</p>
            <div className="login-container" onClick={goLogin}><a>Login</a></div>
            <div className="register-container" onClick={goRegister}><a>Sign Up</a></div>
        </div>

    </div>)
}

export default LandingPage;