"use client";
import React, { useState } from "react";
import { Card, useResource } from "./useResource";
import Form from "./Form";
import Image from "next/image";

const Gallery = () => {
  const { resources, deleteResource, updateResource, loading } = useResource();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {resources?.map((card) => (
          <div key={card.id} className="p-4 border rounded shadow-md bg-white">
            <Image
              src={card.image_url}
              width={500}
              height={500}
              alt="Picture of the author"
            />
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
        ))}
      </div>
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded p-4">
            <h2 className="font-bold mb-2">Update Card</h2>
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
            />
            <button
              className="mt-2 text-white bg-red-500 rounded p-2"
              onClick={() => setSelectedCard(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
