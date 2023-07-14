"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {

  const { data: session } = useSession();

  const isUserLoggedIn = session?.user;

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async function () {
      const response = await getProviders()
      // console.log("Providers", response)
      
      setProviders(response);
    }
    setUpProviders();
  }, []);

  


  return (
    <nav className='flex-between w-full mb-16 pt-3'>

      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>AI_PromptHub</p>
      </Link>


      {/* {console.log({providers})} */}

      {/* Desktop Navigation  */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (

          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image src={session?.user.image} alt="user profile"width={37}height={37}className="rounded-full" />
            </Link>
          </div>

        ):
        (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>




      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
            {isUserLoggedIn  ? (
              <div className="flex">
                <Image 
                  src="/assets/icons/menu.png"
                  alt="user profile"
                  width={37}height={37}
                  className="rounded-full" 

                  onClick={function(){
                    setToggleDropdown(function(prev) {
                      return !prev;
                    })
                  }}
                />

                {toggleDropdown && (
                  <div className="dropdown">

                    <Link 
                      href="/profile" 
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}  
                    >
                      My Profile
                    </Link>

                    <Link 
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}  
                    >
                      Create Post
                    </Link>

                    <button 
                      className="mt-5 w-full black_btn" 
                      onClick={() => { setToggleDropdown(false); signOut(); }}
                    >
                      Sign Out
                    </button>


                  </div>
                )}
              </div>
            ): 
            (
              <>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type='button'
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id);
                      }}
                      className='black_btn'
                    >
                      Sign in
                    </button>
                  ))}
              </>
            )}
      </div>

    </nav>
  );
}

export default Nav;