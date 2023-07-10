import {
  fetchImageResource,
  deleteImageResource,
  updateImageResource,
  Card,
  CardRequest,
  DigitalCardRequest,
} from "./functions";
import Image from "next/image";
import Form from "./Form";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  searchParams: Record<string, string> | null | undefined;
  data: any;
};
export default function ImageGallery({ searchParams, data }: Props) {
  const showModal = searchParams?.modal;
  const selectedCardId = Number(searchParams?.cardid);
  const selectedCard = data?.find((card: Card) => card.id === selectedCardId);

  const onSubmit = (cardInfo: CardRequest | DigitalCardRequest) => {
    if (selectedCard) {
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
    }
  };

  const router = useRouter();

  return (
    <div className="p-4">
      {showModal && (
        <Form
          formType="image"
          initialValues={selectedCard}
          onSubmit={onSubmit}
          onCancel={() => {
            router.push("/image-gallery");
          }}
        />
      )}
      <div className="flex flex-wrap">
        {data?.map((card: Card, idx: number) => (
          <div key={card.id} className="">
            <div className="border rounded shadow-md bg-white">
              <div className="relative pb-6 max-h-lg max-w-lg">
                <Image
                  src={card.image_url}
                  width={1000}
                  height={600}
                  alt={`picture of business card ${idx + 1}`}
                />
              </div>

              <div className="flex justify-between p-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => deleteImageResource(card.id)}
                >
                  Delete
                </button>
                <Link
                  href={`/image-gallery?modal=true&cardid=${card.id}`}
                  className="btn btn-primary"
                >
                  Update Card
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
