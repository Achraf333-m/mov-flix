import Header from "@/components/Header";
import useFireAuth from "@/custom_hooks/useFireAuth";
import { ImSpinner2 } from "react-icons/im";

function account() {
  const { signUserOut, loading } = useFireAuth();
  const signOut = async () => {
    await signUserOut();
  };
  return (
    <>
      <Header />
      <div className="bg-gradient-to-tr from-green-950 to-black h-screen w-full">
        <div className="p-36 space-y-20">
          <h1 className="text-4xl text-white/70">My Account</h1>
          <div className="flex justify-evenly space-x-4">
            <ul className="space-y-4 underline cursor-pointer text-white/60">
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
            <ul className="space-y-4 cursor-pointer text-white/60">
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

              <button className="hover:text-white px-4 py-3 mt-10 !no-underline rounded-md  text-white/90 transition-all duration-300 hover:bg-green-600 bg-green-600/90">
                Cancel Membership
              </button>
          <button className="hover:text-white px-4 py-3 mt-10 !no-underline rounded-md  text-white/90 transition-all duration-300 hover:bg-green-600 bg-green-600/90" onClick={signOut}>{loading? <ImSpinner2 className="animate-spin"/> : 'Log Out'}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default account;
