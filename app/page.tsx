"use client";
import Link from "next/link";
import { NextPage } from "next";
// import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthButtons from "./components/AuthButtons";
import Image from "next/image";
import { useAuth } from "./components/functions";

const HomePage: NextPage = () => {
  const signedIn = useAuth()
  return (
    <>
      <Header/>
      <div className="hero min-h-84 bg-base-200">
        <div className="hero-content text-center lg:flex-row">
          <div className="sm:max-w-md lg:max-w-max lg:flex">
            {/* <h1 className="text-5xl font-bold">Create a Card</h1> */}
            <div className="card card-compact w-96 bg-base-100 shadow-xl my-5 lg:mx-5">
              <figure>
              <Image
                  src="/picture-card.webp"
                  width={500}
                  height={300}
                  alt="picture card default image"
                  className=""
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl">Picture Card</h2>
                <p className="text-xl">Want to get picture of a business card from a template?</p>
                <div className="card-actions justify-end">
                  {signedIn && (
                    <Link href="/images" className="btn btn-primary text-xl">
                      Create Card Image
                    </Link>
                  )}
                  {!signedIn && (
                    <AuthButtons
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl my-5 lg:mx-5">
              <figure>
              <Image
                  src="/digital-card.webp"
                  width={225}
                  height={300}
                  alt="digital card default image"
                  className="rounded-lg"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl">Digital Card</h2>
                <p className="text-xl">
                  Want to be able to show someone a QR Code that automatically
                  saves your contact information?
                </p>
                <div className="card-actions justify-end">
                  {signedIn && (
                    <Link
                      href="/digital"
                      className="btn btn-primary text-xl"
                    >
                      Create Digital Card
                    </Link>
                  )}
                  {!signedIn && (
                    <AuthButtons
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
