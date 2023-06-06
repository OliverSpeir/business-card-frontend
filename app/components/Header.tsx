import React from "react";
import AuthButtons from "./AuthButtons";
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex">
      <AuthButtons/>
      <nav>
        <ul className="flex">
          <li className="p-2">
            <Link href="/image-gallery" className="text-blue-500 hover:text-blue-700">
              Image Gallery
            </Link>
          </li>
          <li className="p-2">
            <Link href="/digital-gallery" className="text-blue-500 hover:text-blue-700">
             Digital Gallery
            </Link>
          </li>
          <li className="p-2">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              Main Page
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
