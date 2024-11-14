import HeaderTop from "./headerTop";
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function RegisterPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/register', {
                name,
                password
            });
            console.log("user logged in:", response.data);
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate('/homepage');
        } catch (error) {
            console.log(error.response ? error.response : error.data);
        }
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