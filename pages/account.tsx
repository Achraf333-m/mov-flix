import useFireAuth from "@/custom_hooks/useFireAuth";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import { MdArrowBackIos } from "react-icons/md";

function account() {
  const { signUserOut, loading } = useFireAuth();
  const signOut = async () => {
    await signUserOut();
  };
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
            <ul className="space-y-4 text-lg underline cursor-pointer text-white/60">
              <li
                onClick={() =>
                  alert("This feature has not been implemented yet")
                }
                className="hover:text-white"
              >
                My history
              </li>
              <li
                onClick={() =>
                  alert("This feature has not been implemented yet")
                }
                className="hover:text-white"
              >
                Personal Information
              </li>
              <li
                onClick={() =>
                  alert("This feature has not been implemented yet")
                }
                className="hover:text-white"
              >
                Payments
              </li>
              <li
                onClick={() =>
                  alert("This feature has not been implemented yet")
                }
                className="hover:text-white"
              >
                My subscription
              </li>
            </ul>
            <div className="h-52 w-1 border-2 border-white/50"></div>
            <ul className="space-y-4 text-lg cursor-pointer text-white/60">
              <li
                onClick={() =>
                  alert("This feature has not been implemented yet")
                }
                className="hover:text-white underline"
              >
                My movies
              </li>
              <li
                onClick={() =>
                  alert("This feature has not been implemented yet")
                }
                className="hover:text-white underline"
              >
                Careers
              </li>
              <li
                onClick={() =>
                  alert("This feature has not been implemented yet")
                }
                className="hover:text-white underline"
              >
                My share list
              </li>
              <li
                onClick={() =>
                  alert("This feature has not been implemented yet")
                }
                className="hover:text-white underline"
              >
                My familyFibe
              </li>
            </ul>
          </div>
          <div className="flex justify-evenly">
            <button className="hover:text-white px-4 py-3 mt-10 !no-underline rounded-md  text-white/70 transition-all duration-300 hover:bg-green-700 bg-green-700/90">
              Cancel Membership
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
