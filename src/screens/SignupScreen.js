import React, { useRef, useEffect, useState } from "react";
import { auth } from "../firebase";
import "./SignupScreen.css";

function SignupScreen(props) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.enteredEmail.length > 0) {
      emailRef.current.value = props.enteredEmail;
    } else emailRef.current.value = " ";
  }, [props.enteredEmail]);

  const register = (e) => {
    e.preventDefault();
    if (
      emailRef.current.value.length > 0 &&
      passwordRef.current.value.length > 0
    ) {
      setIsLoading(true);

      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((authUser) => {
          console.log(authUser);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error.message);
        });
    }
  };

  const signIn = (e) => {
    e.preventDefault();
    if (
      emailRef.current.value.length > 0 &&
      passwordRef.current.value.length > 0
    ) {
      setIsLoading(true);
      auth
        .signInWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((authUser) => {
          console.log(authUser);
          setIsLoading(false);
        })
        .catch((error) =>{
          setIsLoading(false);
          alert(error.message)
        });
    }
  };

  return (
    <div className="signupScreen">
      <form action="">
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button onClick={signIn} type="submit">
          {isLoading ? <p className="spinner-3"></p> : "Sign In"}
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
