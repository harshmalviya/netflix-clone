import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import "./PlansScreen.css";
import { loadStripe } from "@stripe/stripe-js";
import { checkSubscribed } from "../features/subscriptionSlice";
function PlansScreen() {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    dispatch(checkSubscribed(subscription));
  }, [subscription, dispatch]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data()
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    setIsLoading(true);
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          process.env.REACT_APP_STRIPE_PUBLIC_KEY
        );
        stripe.redirectToCheckout({ sessionId });
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <div className="plansScreen">
        <br />
        {subscription && (
          <p>
            Renewal Date:{" "}
            {new Date(
              subscription?.current_period_end * 1000
            ).toLocaleDateString()}
          </p>
        )}
        {Object.entries(products).map(([productId, productData]) => {
          const isCurrentPackage = productData.name
            ?.toLowerCase()
            .includes(subscription?.role);

          return (
            <div
              key={productId}
              className={`${
                isCurrentPackage && "plansScreen__plan--disabled"
              } plansScreen__plan`}
            >
              <div className="plansScreen__info">
                <h5>{productData.name}</h5>
                <h6>{productData.description}</h6>
              </div>
              <button
                onClick={() =>
                  !isCurrentPackage && loadCheckout(productData.prices.priceId)
                }
              >
                {isCurrentPackage ? "Current Package" : "Subscribe"}
              </button>
            </div>
          );
        })}
      </div>
      {isLoading && <p className="loading">Please wait...</p>}
    </>
  );
}

export default PlansScreen;
