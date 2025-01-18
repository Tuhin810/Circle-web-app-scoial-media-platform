import React from "react";
import { Link } from "react-router-dom";
import LoginBtn from "../../shared/loginBtn/LoginBtn";

const LandingScreen = () => {
  return (
    <div>
      <div className="">
        <section className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24">
          <div className="px-4 mx-auto relativea sm:px-6 lg:px-8 max-w-7xl">
            <div className="relative">
              <img
                className="relative w-full max-w-md mx-auto object-cover -mt-16"
                style={{
                  clipPath: "inset(10% 0 10% 0)", // Crop 10% from the top and bottom
                }}
                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/2/illustration.png"
                alt=""
              />
            </div>
            <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
              <div>
                <h1 className="text-4xl -mt-5 font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                  Lets Connect
                </h1>
                <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">
                  Amet minim mollit non deserunt ullamco est sit aliqua
                </p>
                <form
                  action="#"
                  method="POST"
                  className="relative mt-8 rounded-full sm:mt-12"
                >
                  <div className="flex ">
                    <LoginBtn />
                    {/* <Link
                 to="/creator-signup"
                className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold
                 tracking-widest text-black uppercase transition-all duration-200 bg-white rounded-full 
                 sm:w-auto sm:py-3 hover:opacity-90"
              >
                Login
              </Link> */}
                  </div>
                  <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0">
                    <Link
                      to="/creator-signup"
                      className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-black uppercase transition-all duration-200 bg-white rounded-full sm:w-auto sm:py-3 hover:opacity-90"
                    >
                      Create account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingScreen;
