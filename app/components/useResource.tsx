"use client";
import useSWR from "swr";
import { supabase } from "./supabaseClient";

export type Card = {
  id: number;
  email: string;
  job_title: string;
  full_name: string;
  phone_number: string;
  linkedin: string;
  style: string;
  theme: string;
  image_url: string;
  user_id: string;
};

export type CardRequest = Omit<Card, "id" | "image_url" | "user_id">;

const GET_CARDS = `
  query {
    business_cards {
      id
      email
      job_title
      full_name
      phone_number
      linkedin
      style
      theme
      image_url
    }
  }
`;


const DELETE_CARD = `
  mutation delete_business_card($id: Int!) {
    delete_business_card(id: $id)
  }
`;

export function useResource() {
  const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
  }
  const { data, error, mutate } = useSWR("business_cards", fetchResource);

  async function fetchResource() {
    try {
      const session = await supabase.auth.getSession();
      const tokens = session?.data?.session?.access_token;

      const body = {
        query: GET_CARDS,
      };
      const response = await fetch(apiUrl as RequestInfo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens}`,
        },
        body: JSON.stringify(body),
      });

      const responseJSON = await response.json();
      return responseJSON.data.business_cards as Card[];
    } catch (err) {
      console.error(err);
    }
  }

  async function createResource(info: CardRequest) {
    try {
      const session = await supabase.auth.getSession();
      const tokens = session?.data?.session?.access_token;

      const { email, job_title, full_name, phone_number, linkedin, style, theme } = info;

      const query = `
        mutation {
          create_business_card(
            email: "${email}", 
            job_title: "${job_title}", 
            full_name: "${full_name}", 
            phone_number: "${phone_number}", 
            linkedin: "${linkedin}", 
            style: "${style}", 
            theme: "${theme}"
          ) {
            image_url
          }
        }
      `;

      const response = await fetch(apiUrl as RequestInfo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens}`,
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      mutate();
      return data?.data?.create_business_card?.image_url;
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteResource(id: number) {
    try {
      const session = await supabase.auth.getSession();
      const tokens = session?.data?.session?.access_token;

      const body = {
        query: DELETE_CARD,
        variables: { id },
      };

      await fetch(apiUrl as RequestInfo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens}`,
        },
        body: JSON.stringify(body),
      });

      mutate();
    } catch (err) {
      console.error(err);
    }
  }

  return {
    resources: data as Card[] | undefined,
    createResource,
    deleteResource,
    loading: !error && !data,
  };
}
