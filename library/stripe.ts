import app, { db } from "@/firebase";
import { User } from "firebase/auth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export async function createSesh(PriceId: string, user: User | null) {
  let checkoutSessionData = {
    price: PriceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  };

  const checkoutSessionRef = await addDoc(
    // currentUser is provided by firebase, via getAuth().currentUser
    collection(db, `customers/${user?.uid}/checkout_sessions`),
    checkoutSessionData
  );

  // The Stripe extension creates a payment link for us
  onSnapshot(checkoutSessionRef, (snap) => {
    const { error, url }: any | undefined = snap.data();
    if (error) {
      console.log(error);
    }
    if (url) {
      window.location.assign(url); // redirect to payment link
    }
  });
}


const functions = getFunctions(app, "us-central1");
const createPortalLink = httpsCallable(
  functions,
  "ext-firestore-stripe-payments-createPortalLink"
);

// request Stripe to create a portal link, and redirect user there
// createPortalLink({
//   returnUrl: window.location.origin, // can set this to a custom page
// })
//   .then((result) => {
//     window.location.assign(result.data?.success_url);
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
