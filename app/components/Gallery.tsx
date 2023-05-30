"use client";
import React, { useState } from "react";
import { Card, usePrivateResource, PrivateResource } from "./useResource";
import Form from "./Form";
import Image from "next/image";

const Gallery = () => {
  const ApiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
  if (!ApiUrl) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
  }
  const {
    resources,
    deleteResource,
    updateResource,
    loading,
  }: PrivateResource = usePrivateResource(ApiUrl);
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
              initialValues={selectedCard}
              onSubmit={(cardInfo) => {
                updateResource({
                  id: selectedCard.id,
                  image_url: selectedCard.image_url,
                  user_id: selectedCard.user_id,
                  ...cardInfo,
                });
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

export default Gallery;
