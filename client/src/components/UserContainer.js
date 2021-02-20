import React from 'react';

import onlineIcon from '../icons/onlineicon.png';

import './css/UserContainer.css';

const UserContainer = ({ users }) => (
  <div className="userContainer">
    <div>
      <h1>Shall We Talk!<span role="img" aria-label="emoji">💬</span></h1>
    </div>
    {
      users
        ? (
          <div>
            <h2>People currently chatting:</h2>
            <div className="activeContainer">
              <h2>
                {users.map(({id, username}) => (
                  <div key={id} className="activeItem">
                    {username}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default UserContainer;