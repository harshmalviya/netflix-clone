import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";

const SubscriptionContext = React.createContext({
  role: "",
  current_period_end: 0,
  current_period_start: 0
});

export const SubscriptionContextProvider = (props) => {
  const [subscription, setSubscription] = useState({});
  const user = useSelector(selectUser);

  db.collection("customers")
    .doc(user?.uid)
    .collection("subscriptions")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start.seconds
        });
      });
    });

  return (
    <SubscriptionContext.Provider
      value={{
        role: subscription.role,
        current_period_end: subscription.current_period_end,
        current_period_start: subscription.current_period_start
      }}
    >{props.children}</SubscriptionContext.Provider>
  );
};

export default SubscriptionContext;
