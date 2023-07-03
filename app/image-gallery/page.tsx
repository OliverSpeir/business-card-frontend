"use client"
// import { ImageGallery } from "../components/Gallery";
import ImageGallery  from "../components/ImageGallery";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState} from "react";

export default async function GalleryPage() {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  return (
    <>
      <Header setSignedIn={setSignedIn} signedIn={signedIn}/>
      <ImageGallery />
      <Footer />
    </>
  );
}
