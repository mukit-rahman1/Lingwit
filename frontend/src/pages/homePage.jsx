import HeaderTop from "./headerTop";
import SideBar from "./sideBar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const [langPick, setLangPick] = useState(false);
    const navigate = useNavigate();


    const handleLangPick = () => {
        if (langPick) {
            setLangPick(false)
        } else {
            setLangPick(true);
        }
    }
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    }


    return (<>
        <HeaderTop />
        <div className="side-bar">
        <div className="sign-out">
            <li onClick={handleLogOut}>Sign Out</li>
        </div>
        </div>
        <div className="boxes-container">
            <ul className="boxes">
                <a href="/french">
                <li>🇫🇷 French</li>
                </a>
                <li onClick={handleLangPick}>Select Other</li>
            </ul>
        </div>
        {langPick && (
            <div className="lang-picker">

                <ul className="langs">
                    <a href="/french">
                    <li className="lang-button">🇫🇷 French</li>
                    </a>
                </ul>
                <div className="close" onClick={handleLangPick}>
                    <a>Close</a>
                </div>
            </div>
        )}


    </>);
}

export default HomePage;