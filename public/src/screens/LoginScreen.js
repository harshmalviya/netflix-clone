import React, { useState } from "react";
import SignupScreen from "./SignupScreen";
import "./LoginScreen.css";
function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [email, setEmail] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const validateEmailHandler = () => {
    if (email.includes("@") && email.includes(".")) {
      setIsValid(true);
      setError(false);
      setSignIn(true);
    } else {
      setIsValid(false);
      setSignIn(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.length > 0) {
      validateEmailHandler();
      setError(false);
    } else {
      setError(true);
      setSignIn(false);
    }
  };
  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          className="loginScreen__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <button onClick={() => setSignIn(true)} className="loginScreen__button">
          Sign In
        </button>
        <div className="loginScreen__gradient" />
      </div>
      <div className="loginScreen__body">
        {signIn ? (
          <SignupScreen enteredEmail={email}/>
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere, cancel any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="loginScreen__input">
              <form>
                <input
                  type="email"
                  placeholder="Email Address"
                  onChange={emailChangeHandler}
                />
                <button
                  className="loginScreen__getStarted"
                  type="submit"
                  onClick={handleSubmit}
                >
                  GET STARTED
                </button>
              </form>
              {error && (
                <p className="emailError">Email Id can not be empty.</p>
              )}
              {!isValid && !error && (
                <p className="emailError">
                  Please enter a valid email address.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
