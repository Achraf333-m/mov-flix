import useFireAuth from "@/custom_hooks/useFireAuth";
import useSubStatus from "@/custom_hooks/useSubStatus";
import { customerPortal } from "@/library/stripe";
import { DocumentData } from "@firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { MdArrowBackIos } from "react-icons/md";

function account() {
  const { signUserOut, loading, user } = useFireAuth();
  const [date, setDate] = useState<string | undefined>()
  const [sub, setSub] = useState<DocumentData | null | undefined>()
  const signOut = async () => {
    await signUserOut();
  };
  useEffect(() => {
    useSubStatus(user).then((res) => setSub(res))
  }, [user])

  
  useEffect(() => {
    const dateCreated = new Date(1702096056824 - sub?.items[0].price.product.created)
    setDate(dateCreated.toString().slice(0, 15))

  }, [sub])
  return (
    <>
      <div className="h-full w-full">
        <img
          src="_6d4290c6-b297-463c-92a3-98204442469d.jpg"
          alt="background image"
          className="absolute opacity-40 -z-20 w-full h-full object-cover"
        />
        <div className="p-36 space-y-10">
          <div className="absolute top-0 left-0 p-20">
            <Link href="/">
              <MdArrowBackIos className="text-xl" />
            </Link>
          </div>
          <h1 className="text-5xl text-white/70">My Account</h1>
          <div className="flex justify-evenly space-x-4">
            <ul className="space-y-4 text-lg cursor-pointer text-white/60">
              <li
                onClick={() =>
                  alert("This feature has not been implemented yet")
                }
                className="hover:text-white underline"
              >
                My history
              </li>
              <li
                onClick={() =>
                  alert("This feature has not been implemented yet")
                }
                className="hover:text-white underline"
              >
              </li>
              <li
                onClick={() =>
                  alert("This feature has not been implemented yet")
                }
                className="hover:text-white underline"
              >
                Payments
              </li>
              <li
               
                className="hover:text-white"
              >
                Memeber since <h3 className="font-extrabold">{date}</h3>
              </li>
            </ul>
            <div className="h-52 w-1 bg-white/50 rounded-full"></div>
            <ul className="space-y-4 text-lg cursor-pointer text-white/60">
              <li
                className="hover:text-white"
              >
                You are on the {sub?.items[0].price.product.name}
              </li>
              <li
  
                className="hover:text-white"
              >
                Download: {sub?.items[0].price.product.metadata.Download === 'True' ? 'Yes, you can download movies and shows' : 'your plan does not include download'}
              </li>
              <li
                
                className="hover:text-white"
              >
                Stream devices: {sub?.items[0].price.product.metadata.Devices}
              </li>
              <li
               
                className="hover:text-white"
              >
                Quality: {sub?.items[0].price.product.metadata.Quality}
              </li>
            </ul>
          </div>
          <div className="flex justify-evenly">
            <button onClick={customerPortal} className="hover:text-white px-4 py-3 mt-10 !no-underline rounded-md  text-white/70 transition-all duration-300 hover:bg-green-700 bg-green-700/90">
              Edit Membership
            </button>
            <button
              className="hover:text-white px-4 py-3 mt-10 !no-underline rounded-md  text-white/70 transition-all duration-300 hover:bg-green-700 bg-green-700/90"
              onClick={signOut}
            >
              {loading ? <ImSpinner2 className="animate-spin" /> : "Log Out"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default account;
