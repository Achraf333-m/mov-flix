import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { query, collection, where, getDocs, DocumentData } from "firebase/firestore";
import { db } from "@/firebase";
import { Subscription } from "@invertase/firestore-stripe-payments";

function useSubStatus(user: User | null) {
  const [subscription, setSubscription] = useState<DocumentData | null>();

  useEffect(
    () => {
      async () => {
        if (!user) return;
        const q = query(
          collection(db, "customers", user.uid, "subscriptions"),
          where("status", "in", ["trialing", "active"])
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          // user doesn't have any active subscriptions
          setSubscription(querySnapshot.docs[0].data());
          console.log("subscription is (null)", subscription);
        } else {
          setSubscription(querySnapshot.docs[0].data());
          console.log("subscription is", subscription);
        }
      };
    },

    [user]
  );

  return subscription;
}

export default useSubStatus;

// create a query object to the current users active subscriptions
