import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SideBar() {
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

    return(<div className="side-bar">
        <ul className="switch">
            <li onClick={handleLangPick}>Switch Language</li>
            
        </ul>
        <div className="sign-out" onClick={handleLogOut}>
            <a>Sign Out</a>
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
        </div>)
}

export default SideBar;