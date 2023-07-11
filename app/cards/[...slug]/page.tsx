"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  profilePic: string;
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

  const saveToContacts = async (
    name: string,
    jobTitle: string,
    phone: string,
    email: string,
    website: string,
    profilePic: string
  ) => {
    // Fetch the image from the provided URL
    const response = await fetch(profilePic);
    console.log(response);
    const blob = await response.blob();

    // Convert the image Blob to a Base64 string
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;

      if (typeof base64data === "string") {
        const vCardData = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `N:;${name};;;`,
          `FN:${name}`,
          `TITLE:${jobTitle}`,
          `TEL;TYPE=CELL:${phone}`,
          `EMAIL:${email}`,
          `URL:${website}`,
          `PHOTO;ENCODING=b;TYPE=JPEG:${base64data.split(",")[1]}`,
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
      }
    };
  };

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
                        profilePic
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
        // console.log(json);
        setData(json.data.digitalCards);
        const { fullName, email, jobTitle, website, phoneNumber, profilePic } =
          json.data.digitalCards;
        saveToContacts(
          fullName,
          jobTitle,
          phoneNumber,
          email,
          website,
          profilePic
        );
      } catch (error) {}
    };

    fetchData();
  }, [apiUrl, url_slug]);

  if (!data) {
    return (
      <div className="flex justify-center">
        <span className=" min-h-84 w-2/4 loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if ("message" in data) {
    return <h1>Card not found</h1>;
  }

  const { fullName, jobTitle, email, website, phoneNumber, profilePic } = data;

  return (
    <div className="flex justify-center items-center h-screen text-2xl overflow-hidden">
      <div className="overflow-hidden">
        <h1 className="text-4xl font-bold text-center overflow-hidden">
          {fullName}
        </h1>
        <div className="flex justify-center items-center overflow-hidden">
          <Image
            src={profilePic}
            width={600}
            height={600}
            alt={`${fullName}'s Profile Picture`}
            className="mx-5 max-w-xs"
          />
        </div>
        <p className="mt-2 text-center overflow-hidden">{jobTitle}</p>
        <p className="mt-2 text-center overflow-hidden">
          <a href={`mailto:${email}`} className="text-blue-500">
            {email}
          </a>
        </p>
        <p className="mt-2 text-center overflow-hidden">
          <a href={website} className="text-blue-500">
            {website}
          </a>
        </p>
        <p className="mt-2 text-center overflow-hidden">
          <a href={`tel:${phoneNumber}`} className="text-blue-500">
            {phoneNumber}
          </a>
        </p>
        <div className="flex justify-center items-center overflow-hidden">
          <button
            onClick={() =>
              saveToContacts(
                fullName,
                jobTitle,
                phoneNumber,
                email,
                website,
                profilePic
              )
            }
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded overflow-hidden"
          >
            Save to Contacts
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardPage;
