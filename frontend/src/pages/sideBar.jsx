import { useState } from "react";

function SideBar() {
    const [langPick, setLangPick] = useState(false);

    const handleLangPick = () => {
        if (langPick) {
            setLangPick(false)
        } else {
            setLangPick(true);
        }
    }

    return(<div className="side-bar">
        <ul className="switch">
            <li onClick={handleLangPick}>Switch Language</li>
            
        </ul>
        <div className="sign-out">
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