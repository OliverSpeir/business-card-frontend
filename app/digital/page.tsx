"use client";
import React from "react";
import Form from "../components/Form";
import {
  useDigitalCardResource,
  DigitalCardResource,
  DigitalCardRequest,
  CardRequest,
} from "../components/useResource";

export default function DigitalPage() {
  const PrivateApiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
  if (!PrivateApiUrl) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
  }

  const { createResource }: DigitalCardResource =
    useDigitalCardResource(PrivateApiUrl);

  const handleCreate = (cardInfo: DigitalCardRequest | CardRequest) => {
    if ("slug" in cardInfo) {
      createResource(cardInfo as DigitalCardRequest);
    }
  };

  const handleCancel = () => {
    // No operation (no-op)
  };

  return (
    <div className="p-4">
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-10">
        <div>
          <h2 className="relative top-32 left-30 text-2xl font-bold mb-2 z-10">
            Create New Digital Card
          </h2>
          <Form
            formType="digital"
            onSubmit={handleCreate}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}
