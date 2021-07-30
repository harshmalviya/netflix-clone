import React from "react";
import { useHistory } from "react-router-dom";
import "./Users.css";
function Users() {
    const history = useHistory();
    const profileClickHandler = (e) => {
      history.push("/home")
    }
  return (
    <>
      <img
        onClick={profileClickHandler}
        className="nav__logo"
        src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
        alt=""
      />
    <div className="users">
      <div className="users__body" >
      <h1>Who's watching?</h1>
      <div className="users__profiles">
        <div className="user" onClick={profileClickHandler}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="user1"
          />
          <p>User 1</p>
        </div>
        <div className="user" onClick={profileClickHandler}>
          <img src="https://i.imgur.com/YkyLA3e.png" alt="user2" />
          <p>User 2</p>
        </div>
        <div className="user" onClick={profileClickHandler}>
          <img src="https://i.imgur.com/yhnwhe1.png" alt="children" />
          <p>Children</p>
        </div>
      </div>
      <div className="users__button--container">
      <button>MANAGE PROFILES</button>
      </div>
      </div>
    </div>
    </>
  );
}

export default Users;
