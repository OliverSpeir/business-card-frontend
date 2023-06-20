"use client";
import React, { useState } from "react";
import {
  Card,
  DigitalCard,
  useImageResource,
  useDigitalCardResource,
  ImageResource,
  DigitalCardResource,
  CardRequest,
  DigitalCardRequest,
} from "./useResource";
import Form from "./Form";
import Image from "next/image";

const apiCheck = () => {
  const ApiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
  if (!ApiUrl) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
  }
  return ApiUrl;
};

const ImageGallery = () => {
  const ApiUrl = apiCheck();
  const { resources, deleteResource, updateResource, loading }: ImageResource =
    useImageResource(ApiUrl);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex flex-wrap">
        {resources?.map((card, idx) => (
          <div key={card.id} className="">
            <div className="border rounded shadow-md bg-white">
              <div className="relative pb-6">
                <Image
                  src={card.image_url}
                  width={1000}
                  height={600}
                  alt={`picture of business card ${idx + 1}`}
                />
              </div>
              <div className="flex justify-between p-2">
                <button
                  className="text-white bg-red-500 rounded p-2 mr-2"
                  onClick={() => deleteResource(card.id)}
                >
                  Delete
                </button>
                <button
                  className="text-white bg-blue-500 rounded p-2"
                  onClick={() => setSelectedCard(card)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedCard && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-10">
          <div>
            <h2 className="relative top-32 left-30 text-2xl font-bold mb-2 z-10">
              Update Card
            </h2>
            <Form
              formType="image"
              initialValues={selectedCard}
              onSubmit={(cardInfo: CardRequest | DigitalCardRequest) => {
                const updatedCardInfo: Card = {
                  id: selectedCard.id,
                  image_url: selectedCard.image_url,
                  user_id: selectedCard.user_id,
                  ...(cardInfo as CardRequest),
                };

                if ("base_card" in cardInfo) {
                  updatedCardInfo.base_card = cardInfo.base_card;
                }

                updateResource(updatedCardInfo);
                setSelectedCard(null);
              }}
              onCancel={() => setSelectedCard(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const DigitalGallery = () => {
  const ApiUrl = apiCheck();
  const {
    resources,
    deleteResource,
    updateResource,
    loading,
  }: DigitalCardResource = useDigitalCardResource(ApiUrl);
  const [selectedCard, setSelectedCard] = useState<DigitalCard | null>(null);
  if (loading) return <div>Loading...</div>;
  console.log(resources)
  return (
    <div className="p-4">
      <div className="flex flex-wrap">
        {resources?.map((card, idx) => (
          <div key={card.id} className="">
            <div className="border rounded shadow-md bg-white">
              <div className="relative pb-6">
                <h1 className="bg-slate-600 text-center">Slug: {card.slug}</h1>
                  <h2>QR CODE:</h2>
                <Image
                  src={card.qr_code}
                  width={500}
                  height={300}
                  alt={`QR code of digital card ${idx + 1}`}
                  className=""
                />
                <div className="bg-slate-600">
                  <ul>
                    <li>
                      Full Name: {card.full_name}
                    </li>
                    <li>
                      Job title: {card.job_title}
                    </li>
                    <li>
                      Phone Number: {card.phone_number}
                    </li>
                    <li>
                      Website: {card.website}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between p-2">
                <button
                  className="text-white bg-red-500 rounded p-2 mr-2"
                  onClick={() => deleteResource(card.id)}
                >
                  Delete
                </button>
                <button
                  className="text-white bg-blue-500 rounded p-2"
                  onClick={() => setSelectedCard(card)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedCard && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-10">
          <div>
            <h2 className="relative top-32 left-30 text-2xl font-bold mb-2 z-10">
              Update Card
            </h2>
            <Form
              formType="digital"
              initialValues={selectedCard}
              onSubmit={(cardInfo: CardRequest | DigitalCardRequest) => {
                const updatedCardInfo: DigitalCard = {
                  id: selectedCard.id,
                  qr_code: selectedCard.qr_code,
                  user_id: selectedCard.user_id,
                  ...(cardInfo as DigitalCardRequest),
                };

                if ("slug" in cardInfo) {
                  updatedCardInfo.slug = cardInfo.slug;
                }

                updateResource(updatedCardInfo);
                setSelectedCard(null);
              }}
              onCancel={() => setSelectedCard(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { ImageGallery, DigitalGallery };
