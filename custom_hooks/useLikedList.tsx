import { db } from "@/firebase";
import { Movie } from "@/typings";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

function useLikedList(uid: string | undefined) {
  const [list, setList] = useState<Movie[] | DocumentData[]>([]);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(
      collection(db, "customers", uid, "MyList"),

      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            key: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [db, uid]);

  return list;
}

export default useLikedList;