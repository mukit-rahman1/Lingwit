import HeaderTop from "./headerTop";
import SideBar from "./sideBar";
import React, { useState } from "react";

function HomePage() {
    const [langPick, setLangPick] = useState(false);


    const handleLangPick = () => {
        if (langPick) {
            setLangPick(false)
        } else {
            setLangPick(true);
        }
    }

    return (<>
        <HeaderTop />
        <div className="side-bar">
        <div className="sign-out">
            <a>Sign Out</a>
        </div>
        </div>
        <div className="boxes-container">
            <ul className="boxes">
                <li>Hi</li>
                <li>Hi</li>
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