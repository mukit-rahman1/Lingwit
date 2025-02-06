import HeaderTop from "./headerTop";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://lingwit-backend.onrender.com/api/auth/login', {
                username,
                password,
            });
            console.log("User logged in:", response.data);
            const token = response.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem('userId', response.data.userId);
            navigate('/homepage');
        } catch (error) {
            console.log(error);
            console.log("login error: ", error.response ? error.response.data : error.message)
            setStatus("Incorrect Username or Password!");
        }
    }

    return(<>
    <HeaderTop />
    <div className="auth-container">
        <input placeholder="Username" className="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <input placeholder="Password" className="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <a className="absolute bottom-1/3 -translate-x-1/2 -translate-y-1/2 font-mono">{status}</a>
        <div className="submit" onClick={handleLogin}>
            <a className="login-submit">Login</a>
        </div>
    </div>
    </>);
};

export default LoginPage;