import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
// import { buttonVariants } from "@/registry/new-york/ui/button"
// import { UserAuthForm } from "@/app/examples/authentication/components/user-auth-form"
import { useEffect, useState } from "react";
// import Lottie from "lottie-react-web";
// import { buttonVariants } from "@/registry/new-york/ui/button"
// import { UserAuthForm } from "@/app/examples/authentication/components/user-auth-form"
import rotate from "@/assets/lotties/rotate.json";
import { SignupForm } from "../../_components/signup-form";
import Lottie from "lottie-react-web";
import Logo from "@/assets/images/logo/bloxat-colored.webp";

// export const metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// };

const Signup = () => {
  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div> */}
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex overflow-y-clip">
          <div className="absolute inset-0 bg-zinc-900" />
          {/* bg-zinc-900 */}

          <div className="flex items-center justify-center h-full text-black z-10">
            {/* <img
              src="https://media.publit.io/file/bloxat-login.webp"
              // width={0}
              // height={0}
              className="flex w-full "
              alt="Bloxat Login Graphic"
              draggable={false}
            /> */}

            <div className="relative flex w-[330px]">
              <Lottie
                options={{
                  animationData: rotate,
                  loop: true,
                }}
                speed={0.5}
              />
            </div>
          </div>
          {/* LOGO */}
          <div className="absolute left-4 top-4 md:left-8 md:top-8 z-10">
            <img
              src={Logo}
              alt="Logo"
              className="h-[20px] w-auto"
              // width={0}
              // height={900}
              draggable={false}
            />
          </div>

          {/* <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            bloxat
          </div> */}
          {/*  */}
          {/* TESTIMONIAL */}
          {/* <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div> */}
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center mt-10">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create your Bloxat account
              </h1>
              {/* <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p> */}
            </div>
            <SignupForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="https://bloxat.com/terms-of-service/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="https://bloxat.com/privacy-policy/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;