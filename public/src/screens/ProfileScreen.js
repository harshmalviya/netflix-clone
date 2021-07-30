import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import PlansScreen from "./PlansScreen";
import { useHistory } from "react-router-dom";
import "./ProfileScreen.css";
import SubscriptionContextProvider from "../store/subscription-context";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [signingOut, setSigningOut] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const subscriptionCtx = useContext(SubscriptionContextProvider);

  useEffect(() => {
    if (
      subscriptionCtx.role === undefined
    ) {
      setSubscribed(false);
    } else {
      setSubscribed(true);
    }
  }, [subscriptionCtx]);

  const signOutAccountHandler = (event) => {
    setSigningOut(true);
    auth.signOut();
    setSigningOut(false);
  };

  const showHomeScreenHandler = () => {
    history.push("/");
  };

  return (
    <div className="profileScreen">
      <img
        onClick={showHomeScreenHandler}
        className="nav__logo"
        src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
        alt=""
      />
      <div className="profileScreen__body">
        <h1>{subscribed ? "Edit Profile" : "Buy a Plan"}</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
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
  );
}

export default ProfileScreen;
