import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// screens import
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
//firebase import
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Users from "./screens/Users";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);



  return (
    <div className="app">

      <Router>
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/profile">
              <ProfileScreen />
            </Route>
            <Route exact path="/">
              {!user ? <LoginScreen /> : <ProfileScreen />}   
            </Route>
            <Route path="/home">
                <HomeScreen />
            </Route>
          </Switch>
      </Router>
    </div>
  )};

export default App;
