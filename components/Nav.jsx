"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  // const{data: session}= useSession();
  const { data: session } = useSession();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex justify-between items-center w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 items-center justify-center">
        <Image
          src="./assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
        />
        <h5 className="logo_text">Promptopia</h5>
      </Link>

      {/* Desktop Navigation  */}
      <div className="sm:flex hidden">
        {" "}
        {/*on small screens >640px and above the div is visible.*/}
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 ">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                alt="profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation  */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              alt="profile"
              width={32}
              height={32}
              className="rounded-full cursor-pointer"
              onClick={() => setToggleDropDown((prevState) => !prevState)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  onClick={() => setToggleDropDown((prevState) => !prevState)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  onClick={() => setToggleDropDown((prevState) => !prevState)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setToggleDropDown((prevState) => !prevState);
                  }}
                  className="black_btn w-full cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
