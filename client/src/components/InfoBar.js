import React from 'react';
import './css/InfoBar.css';
import closeIcon from '../icons/closeicon.png';
import onlineIcon from '../icons/onlineicon.png';

const InfoBar = ( { room, setToken, disconnected }) => {
    const logout = () => {
        setToken(null)
        localStorage.clear()
        disconnected()
    }

    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="onlineimage" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/" onClick={() => logout()}><img src={closeIcon} alt="closeimage" /></a>
            </div>
        </div>
    )
}

export default InfoBar