"use client"
import {DigitalGallery} from '../components/Gallery';
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState} from "react";

export default function GalleryPage() {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  return (
    <>
    <Header setSignedIn={setSignedIn} signedIn={signedIn}/>
    <DigitalGallery />
    <Footer/>
    </>
  )
}