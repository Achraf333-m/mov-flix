import app, { db } from "@/firebase";
import { User } from "firebase/auth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export async function createSesh(PriceId: string, user: User | null) {
  let checkoutSessionData = {
    price: PriceId,
    success_url: `${window.location.origin}`,
    cancel_url: `${window.location.origin}`,
  };

  const checkoutSessionRef = await addDoc(
    collection(db, `customers/${user?.uid}/checkout_sessions`),
    checkoutSessionData
  );

  onSnapshot(checkoutSessionRef, (snap) => {
    const { error, url }: any | undefined = snap.data();
    if (error) {
      console.log(error);
    }
    if (url) {
      window.location.assign(url);
    }
  });
}


export const customerPortal = () => {
  const functions = getFunctions(app, 'us-central1');
  const createPortalLink:any = httpsCallable(
    functions, 
    'ext-firestore-stripe-payments-createPortalLink');
  createPortalLink({
      returnUrl: window.location.origin 
  }).then((result:any) => {
      window.location.assign(result?.data.url);
  }).catch((error:Error) => {
      // handle error
      console.log(error)
  });

}
