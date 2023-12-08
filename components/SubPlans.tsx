import { Product } from "@invertase/firestore-stripe-payments";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdCheckCircleOutline } from "react-icons/md";
import { useState } from "react";
import useFireAuth from "@/custom_hooks/useFireAuth";
import { createSesh } from "@/library/stripe";
import { User } from "firebase/auth";

interface props {
  products: Product[];
  user: User | null;
}

function SubPlans({ products, user }: props) {
  const [selectedPlan, setSelectedPlan] = useState(products[1])

console.log(products)
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
        <div className="p-8 h-full w-full">
          <div className="flex w-full h-full justify-center items-center space-x-40">
            <h1 className="text-center text-green-300 drop-shadow-xl drop-shadow-max-w-xs text-2xl font-extralight">
              Welcome To MovieFlix, you are one step away from unlimted movies
              and shows!!
            </h1>
            {products.map((product) => (
              <>
                <div key={product.id} onClick={() => setSelectedPlan(product)} className={`sub_style cursor-pointer ${selectedPlan.priceId === product.priceId ? 'opacity-100 border-[1px] border-green-500 border-s-fuchsia-500 p-10' : 'opacity-70'}`}>
                  <h3>{product.name}</h3>
                  <p className="text-center text-[16px] font-extralight">{product.description}</p>
                  <button className="sub_btn" onClick={() => {createSesh(product?.priceId, user)}}>Purchase Plan</button>
                </div>
              </>
            ))}
          </div>
          {/* <button onClick={() => createPortalLink(functions)}>portallink</button> */}
        </div>
      </div>
    </>
  );
}

export default SubPlans;
