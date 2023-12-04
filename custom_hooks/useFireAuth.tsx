import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/firebase";

import { useRouter } from "next/router";
interface AuthProps {
  children: React.ReactNode;
}

interface CtxAuth {
  user: User | null;
  signUserIn: (email: string, password: string) => Promise<void>;
  signUserUp: (email: string, password: string) => Promise<void>;
  signUserOut: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<CtxAuth>({
  user: null,
  signUserIn: async () => {},
  signUserUp: async () => {},
  signUserOut: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
        router.push("/signIn");
      }
      setLoading(false)
    });
  }, [auth]);

  const signUserUp = async (email: string, password: string) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userInfos) => {
        setUser(userInfos.user);
        router.push("/");
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };
  const signUserIn = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userInfos) => {
        setUser(userInfos.user);
        router.push("/");
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };
  const signUserOut = async () => {
    setLoading(true);
    await signOut(auth)
      .then(() => {
        setUser(null);
        setLoading(false);
        router.push("/signIn");
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const memo = useMemo(
    () => ({ user, loading, error, signUserIn, signUserUp, signUserOut }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
};

export default function useFireAuth() {
  return useContext(AuthContext);
}
