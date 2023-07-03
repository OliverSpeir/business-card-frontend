import React from "react";
import AuthButtons from "./AuthButtons";
import Link from "next/link";

type HeaderProps = {
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signedIn: boolean;
};

export default function Header({ setSignedIn, signedIn }: HeaderProps) {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          {signedIn && (
            <details className="dropdown">
              <summary tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </summary>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-32"
              >
                <li>
                  <Link href="/image-gallery">Image Gallery</Link>
                </li>
                <li>
                  <Link href="/digital-gallery">Digital Gallery</Link>
                </li>
              </ul>
            </details>
          )}
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            Create-a-Card
          </Link>
        </div>
        {signedIn && (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/image-gallery">Image Gallery</Link>
              </li>
              <li>
                <Link href="/digital-gallery">Digital Gallery</Link>
              </li>
            </ul>
          </div>
        )}
        <div className="navbar-end">
          {signedIn && (
            <AuthButtons setSignedIn={setSignedIn} signedIn={signedIn} />
          )}
          {/* <AuthButtons setSignedIn={setSignedIn} signedIn={signedIn} /> */}
        </div>
      </div>
    </>
  );
}
