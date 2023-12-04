import useFireAuth from "@/custom_hooks/useFireAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";

interface props {
  title: string;
}

interface infos {
  email: string;
  password: string;
}

function AuthPage({ title }: props) {
  const router = useRouter();
  const { signUserIn, signUserUp, loading } = useFireAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<infos>();
  const formSubmit: SubmitHandler<infos> = async({ email, password }) => {
    if (router.pathname === '/signIn') {
        console.log(router.pathname)
        await signUserIn(email, password)
    } else if (router.pathname === '/signUp') {
        console.log(router.pathname)
        await signUserUp(email, password)
    } else {
        return null
    }
  }
  return (
    <div className="w-full h-full">
      <img
        src="_0306528c-c807-44b8-9131-e2b0ae0a9728.jpg"
        alt="background image"
        className="absolute opacity-40 -z-20 w-full h-full object-cover"
      />
      <div className="flex justify-center items-center w-full h-screen space-y-4 flex-col">
        <img src="Logo.png" alt="" />
        <form className="flex flex-col items-center max-w-md md:w-[348px] justify-center space-y-2">
          <input
            className="px-4 py-3 rounded-md outline-none w-full bg-green-950/70 text-white/80"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            />
            {errors.email && (<h3 className="font-extralight text-red-500 text-md w-full text-center max-w-md">Please enter a valid email to contiue</h3>)}
          <input
            className="px-4 py-3 rounded-md outline-none w-full bg-green-950/70 text-white/80"
            type="password"
            placeholder="Enter your password"
            min={6}
            {...register("password", { required: true })}
            />
            {errors.password && (<h3 className="font-extralight text-red-500 text-md w-full text-center max-w-md">Please enter a valid password</h3>)}
            
          <button
            type="submit"
            onClick={handleSubmit(formSubmit)}
            className="px-4 py-3 flex justify-center items-center rounded-md w-full text-white/90 hover:text-white transition-all duration-300 hover:bg-green-600 bg-green-600/90"
          >
            {loading ? <ImSpinner2 className="animate-spin" /> : title}
          </button>
        </form>
        {router.pathname === "/signIn" && (
          <h3 className="font-extralight text-green-300">
            New to MovieFlix?{" "}
            <Link className="animate-pulse" href="/signUp">
              Sign Up!
            </Link>
          </h3>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
