import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import PlansScreen from "./PlansScreen";
import { Redirect, useHistory } from "react-router-dom";
import "./ProfileScreen.css";
import OverlayModal from "../modal/OverlayModal";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [signingOut, setSigningOut] = useState(false);
  const isSubscribed = useSelector((state) => state.subscription.isSubscribed);

  const signOutAccountHandler = () => {
    setSigningOut(true);
    auth.signOut();
    <Redirect to="/"/>
    setSigningOut(false);
  };

  const showHomeScreenHandler = () => {
    if (isSubscribed) {
      history.push("/home");
    }
  };

  return (
    <>
      <OverlayModal />
      <div className="profileScreen">
        {isSubscribed && (
          <img
            onClick={showHomeScreenHandler}
            className="nav__logo"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
        )}

        <div className="profileScreen__body">
          <h1>{isSubscribed ? "Edit Profile" : "Select A Plan"}</h1>
          <div className="profileScreen__info">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt=""
            />
            <div className="profileScreen__details">
              <h2>{user?.email}</h2>
              <div className="profileScreen__plans">
                <h3>Plans</h3>
                <PlansScreen />
                <button
                  onClick={signOutAccountHandler}
                  className="profileScreen__signOut"
                >
                  {signingOut ? "Signing Out..." : "Sign Out"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileScreen;
