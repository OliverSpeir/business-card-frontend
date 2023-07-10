import {
  fetchImageResource,
  deleteImageResource,
  updateImageResource,
  Card,
  CardRequest,
  DigitalCardRequest,
} from "./functions";
import Image from "next/image";
import { useState } from "react";
import Form from "./Form";
import Link from "next/link";

type Props = {
  searchParams: Record<string, string> | null | undefined;
  data: any;
};
export default function ImageGallery({ searchParams, data }: Props) {
  // const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const showModal = searchParams;
  console.log(showModal)
  // const resources = await fetchImageResource();
  return (
    <div className="p-4">
      <div className="flex flex-wrap">
        {data?.map((card, idx) => (
          <div key={card.id} className="">
            <div className="border rounded shadow-md bg-white">
              {!showModal && (
                <div className="relative pb-6 max-h-lg max-w-lg">
                  <Image
                    src={card.image_url}
                    width={1000}
                    height={600}
                    alt={`picture of business card ${idx + 1}`}
                  />
                </div>
              )}
              <div className="flex justify-between p-2">
                <button
                  className="text-white bg-red-500 rounded p-2 mr-2"
                  onClick={() => deleteImageResource(card.id)}
                >
                  Delete
                </button>
                {/* <button
                    className="text-white bg-blue-500 rounded p-2"
                    onClick={() => setSelectedCard(card)}
                  > 
                    Update
                  </button> */}
                <Link
                  href="/image-gallery?modal=true"
                  className=" p-4 bg-red-500"
                >
                  Update Card
                </Link>
                {showModal && (
                  <div className="absolute top-96 bg-green-600 p-32">
                    {" "}
                    Hello?
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* {selectedCard && (
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
  
                  updateImageResource(updatedCardInfo);
                  setSelectedCard(null);
                }}
                onCancel={() => setSelectedCard(null)}
              />
            </div>
          </div>
        )} */}
    </div>
  );
}
