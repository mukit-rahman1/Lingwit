import HeaderTop from "./headerTop";
import React, {useState} from "react";

function RegisterPage() {

    const [status, setStatus] = useState("");

    const handleLogin = () => {
        setStatus("Worked!");
    }

    return(<>
    <HeaderTop />
    <div className="auth-container">
        <input placeholder="Username" className="username"></input>
        <input placeholder="Password" className="password"></input>
        
        <a className="absolute bottom-1/3 -translate-x-1/2 -translate-y-1/2 font-mono">{status}</a>
        <div className="submit" onClick={handleLogin}>
            <a className="login-submit">Register</a>
        </div>
    </div>
    </>);
};

export default RegisterPage;