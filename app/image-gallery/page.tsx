"use client"
// import { ImageGallery } from "../components/Gallery";
import ImageGallery  from "../components/ImageGallery";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState} from "react";
import {
  fetchImageResource,
} from "../components/functions";
import { useRouter } from 'next/navigation'

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function GalleryPage({ searchParams }: Props) {
  const resources = await fetchImageResource();
  return (
    <>
      <Header/>
      <ImageGallery searchParams={searchParams} data={resources}/>
      <Footer />
    </>
  );
}
