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
import Link from "next/link";

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
  if (loading)
    return (
      <div className="flex justify-center">
        <span className=" min-h-84 w-2/4 loading loading-spinner text-primary"></span>
      </div>
    );

  return (
    <>
      <div className="flex flex-wrap justify-evenly">
        {resources?.map((card, idx) => (
          <>
            <div key={card.id} className="md:max-w-md xl:max-w-lg my-6">
              <Image
                src={card.image_url}
                width={1000}
                height={600}
                alt={`picture of business card ${idx + 1}`}
                className="rounded-lg"
              />
              <div className="flex justify-between bg-base-100 rounded-lg">
                <button
                  className="btn btn-error mx-2"
                  onClick={() => deleteResource(card.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => setSelectedCard(card)}
                >
                  Update
                </button>
              </div>
            </div>
          </>
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
    </>
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
  if (loading)
  return (
    <div className="flex justify-center">
      <span className=" min-h-84 w-2/4 loading loading-spinner text-primary"></span>
    </div>
  );
  return (
    <div className="p-4 min-h-78 hero">
      <div className="flex flex-wrap justify-evenly hero">
        {resources?.map((card, idx) => (
          <div key={card.id} className="">
            <div className="relative pb-6 card bg-base-200 max-w-sm">
              <figure>
                <Image
                  src={card.qr_code}
                  width={225}
                  height={300}
                  alt={`QR code of digital card ${idx + 1}`}
                  className="rounded-lg"
                />
              </figure>
              <div className="card-body max-w-xs sm:max-w-full">
                <div className="overflow-x-auto">
                  <table className="table">
                 
                    <tbody className="">
                   
                      <tr className="bg-base-200">
                        <th>Full Name</th>
                        <td>{card.full_name}</td>
                      </tr>
                    
                      <tr>
                        <th>Job title</th>
                        <td>{card.job_title}</td>
                      </tr>
                   
                      <tr>
                        <th>Phone Number</th>
                        <td>{card.phone_number}</td>
                      </tr>
                  
                      <tr>
                        <th>Website</th>
                        <td>{card.website}</td>
                      </tr>
              
                      <tr>
                        <th>Slug</th>
                        <td><Link href={`/cards/${card.slug}`} className="link link-info">{card.slug}</Link></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-between mx-4 card-actions">
                <button
                  className="btn btn-error"
                  onClick={() => deleteResource(card.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
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
            <h2 className="relative top-20 text-center text-2xl font-bold mb-2 z-10">
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
