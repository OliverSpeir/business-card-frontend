"use client"
import { useEffect, useState } from "react";

type CardPageProps = {
  params?: {
    slug?: string;
  };
};

type DigitalCard = {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  website: string;
  phoneNumber: string;
};

type NotFoundError = {
  message: string;
};

type DigitalCardsResponse = DigitalCard | NotFoundError;

function CardPage({ params }: CardPageProps) {
  const url_slug = params?.slug;

  const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
  }

  const [data, setData] = useState<DigitalCardsResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!url_slug) {
            throw new Error("URL Slug is missing");
        }
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
                query digitalCards($slug: String!) {
                    digitalCards(slug: $slug) {
                    ... on DigitalCard {
                        id
                        fullName
                        jobTitle
                        email
                        website
                        phoneNumber
                    }
                    ... on NotFoundError {
                        message
                    }
                    }
                }
            `,
            variables: { slug: url_slug[0] },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json.data.digitalCards);
      } catch (error) {
      }
    };

    fetchData();
  }, [apiUrl, url_slug]);

  if (!data) {
    return <div>Loading...</div>;
  }

  if ('message' in data) {
    return <h1>Card not found</h1>;
  }

  const { fullName, jobTitle, email, website, phoneNumber } = data;

  const saveToContacts = (name: string, phone: string, email: string, website: string) => {
    const vCardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:;${name};;;`,
      `FN:${name}`,
      `TEL;TYPE=CELL:${phone}`,
      `EMAIL:${email}`,
      `URL:${website}`,
      "END:VCARD",
    ].join("\n");

    const url = URL.createObjectURL(
      new Blob([vCardData], { type: "text/vcard" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
};

  return (
    <div className="flex justify-center items-center h-screen">
        <div>
          <h1 className="text-xl font-bold text-center">{fullName}</h1>
          <p className="mt-2 text-center">{jobTitle}</p>
          <p className="mt-2 text-center">
            <a href={`mailto:${email}`} className="text-blue-500">
              {email}
            </a>
          </p>
          <p className="mt-2 text-center">
            <a href={website} className="text-blue-500">
              {website}
            </a>
          </p>
          <p className="mt-2 text-center">
            <a href={`tel:${phoneNumber}`} className="text-blue-500">
              {phoneNumber}
            </a>
          </p>
          <button
            onClick={() => saveToContacts(fullName, phoneNumber, email, website)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save to Contacts
          </button>
        </div>
    </div>
  );
}

export default CardPage;
