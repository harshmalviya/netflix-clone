import React, { useEffect, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
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
import SubscriptionContextProvider from "./store/subscription-context";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [subscription, setSubscription] = useState(false);
  const subscriptionCtx = useContext(SubscriptionContextProvider);

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

  useEffect(() => {
    const checkIfSubscribed = () => {
      if (
        subscriptionCtx.role === undefined
      ) {
        setSubscription(false);
      } else {
        setSubscription(true);
      }
    }
    return checkIfSubscribed;
  }, [subscriptionCtx]);
  console.log(subscription);


  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/profile">
              <ProfileScreen />
            </Route>
            <Route exact path="/">
              {!subscription ? <Redirect to="/profile" /> : <HomeScreen />}
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
