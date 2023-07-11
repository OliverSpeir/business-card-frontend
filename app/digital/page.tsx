"use client";
import React, { useState} from "react";
import Form from "../components/Form";
import {
  useDigitalCardResource,
  DigitalCardResource,
  DigitalCardRequest,
  CardRequest,
} from "../components/useResource";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DigitalPage() {
  const PrivateApiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
  if (!PrivateApiUrl) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
  }
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [slugValidation, setSlugValidation] = React.useState<{
    unique: boolean;
    message: string;
  }>({ unique: true, message: "" });
  const { createResource }: DigitalCardResource =
    useDigitalCardResource(PrivateApiUrl);

  const handleCreate = async (cardInfo: DigitalCardRequest | CardRequest) => {
    if ("slug" in cardInfo) {
      const result = await createResource(cardInfo as DigitalCardRequest);
      console.log(result)
      if (!result) {
        setSlugValidation({
          unique: false,
          message: "Slug needs to be unique.",
        });
      }
      if (result){
        setSlugValidation({
          unique: true,
          message: "",
        })
      }
    }
  };

  return (
    <>
    <Header setSignedIn={setSignedIn} signedIn={signedIn}/>
    <div className="lg:-mt-16">
      <div className="bg-opacity-50 flex items-center justify-center z-10">
        <div>
          <h2 className="text-center font-bold relative top-18 md:top-24 z-10 "> Create New Digital Card</h2>
          <Form
            formType="digital-create"
            onSubmit={handleCreate}
            slugValidation={slugValidation}
          />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
