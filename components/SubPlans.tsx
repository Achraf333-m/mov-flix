import { Product } from "@invertase/firestore-stripe-payments";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdCheckCircleOutline } from "react-icons/md";
import { useState } from "react";
import useFireAuth from "@/custom_hooks/useFireAuth";
import { createSesh } from "@/library/stripe";
import { User } from "firebase/auth";
import { ImSpinner2 } from "react-icons/im";

interface props {
  products: Product[];
  user: User | null;
}

function SubPlans({ products, user }: props) {
  const [selectedPlan, setSelectedPlan] = useState(products[1]);
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Head>
        <title>MovieFlix</title>
      </Head>
      <div className="h-screen w-full">
        <img
          src="_517d00cc-4789-43c9-bd86-083957b1bd07.jpg"
          alt="background image"
          className="absolute opacity-40 -z-20 w-full h-full object-cover"
        />
        <div className="md:p-8 p-4  h-full w-full">
          <div className="flex flex-col md:flex-row w-full h-full justify-center items-center space-y-2 md:space-x-40">
            <h1 className="text-center text-green-300 drop-shadow-xl drop-shadow-max-w-xs text-2xl font-extralight">
              Welcome To MovieFlix, you are one step away from unlimted movies
              and shows!!
            </h1>
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedPlan(product)}
                className={`sub_style cursor-pointer ${
                  selectedPlan.priceId === product.priceId
                    ? "opacity-100 border-[1px] border-green-500 border-s-fuchsia-500 bg-green-500/5"
                    : "opacity-70"
                }`}
              >
                <h3>{product.name}</h3>
                <p className="text-center text-[16px] font-extralight">
                  {product.description}
                </p>
                <button
                  disabled={loading}
                  className={`sub_btn ${
                    selectedPlan.priceId !== product.priceId
                      && "pointer-events-none"
                    
                  }`}
                  onClick={() => {
                    createSesh(product?.priceId, user); setLoading(true)
                  }}
                >
                  {loading ? 'Redirecting you...' : 'Purchase Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SubPlans;
