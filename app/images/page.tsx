"use client";
import React, { useState } from "react";
import Form from "../components/Form";
import {
  usePublicResource,
  useImageResource,
  PublicResource,
  ImageResource,
} from "../components/useResource";
import Image from "next/image";

export default function ImagePage() {
  const PublicApiUrl = process.env.NEXT_PUBLIC_GRAPHQL_PUBLIC_API_URL;
  if (!PublicApiUrl) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_PUBLIC_API_URL is not defined");
  }
  const PrivateApiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
  if (!PrivateApiUrl) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
  }

  const { publicResources }: PublicResource = usePublicResource(PublicApiUrl);
  const { createResource }: ImageResource = useImageResource(PrivateApiUrl);

  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const handleCancel = () => {
    setCreateFormVisible(false);
  };
  const getBaseCardFromImageUrl = (imageUrl: string): string => {
    if (typeof imageUrl === "string") {
      const urlParts = imageUrl.split("/");
      return urlParts[urlParts.length - 1];
    }
    return "";
  };
  return (
    <div className="p-4">
      <div className="flex flex-wrap">
        {publicResources?.map((imageUrl: string, idx: number) => {
          const baseCard = getBaseCardFromImageUrl(imageUrl);
          return (
            <div key={idx} className="">
              <div className="border rounded shadow-md bg-white">
                <div className="relative pb-6">
                  <Image
                    src={imageUrl}
                    width={1000}
                    height={600}
                    alt={`picture ${idx + 1}`}
                  />
                  <button
                    className="text-white bg-blue-500 rounded p-2"
                    onClick={() => {
                      setCreateFormVisible(true);
                      setSelectedCard(baseCard);
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {createFormVisible && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-10">
          <div>
            <h2 className="relative top-32 left-30 text-2xl font-bold mb-2 z-10">
              Create New Image
            </h2>
            <Form
              formType="image"
              onSubmit={(cardInfo) => {
                createResource({ ...cardInfo, base_card: selectedCard });
                setCreateFormVisible(false);
              }}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
