import { User } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";


async function useSubStatus(user: User | null) {
    if (!user) return;
    const q = query(
      collection(db, "customers", user.uid, "subscriptions"),
      where("status", "in", ["trialing", "active"])
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null
    }
    const subscription = querySnapshot.docs[0].data()
  
    return subscription;
  

}

export default useSubStatus;

