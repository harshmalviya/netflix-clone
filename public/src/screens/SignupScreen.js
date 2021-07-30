import React, { useRef, useEffect } from "react";
import { auth } from "../firebase";
import "./SignupScreen.css";

function SignupScreen(props) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if(props.enteredEmail.length > 0){
      emailRef.current.value = props.enteredEmail;
    }
    else (
      emailRef.current.value = ' '
    )

  }, [props.enteredEmail]);

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
    )
    .then((authUser) => {
        console.log(authUser);
    })
    .catch((error) => alert(error.message));
  };

  return (
    <div className="signupScreen">
      <form action="">
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button onClick={signIn} type="submit">
          Sign In
        </button>
        <h4>
          <span className="singupScreen__grey">New to Netflix? </span>
          <span className="signupScreen__link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignupScreen;
