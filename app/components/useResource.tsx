"use client";
import useSWR, { mutate } from "swr";
import { supabase } from "./supabaseClient";

export interface PublicResource {
  publicResources: string[] | undefined;
  loading: boolean;
}

export interface PrivateResource {
  resources: Card[] | undefined;
  createResource: (card: CardRequest) => Promise<string | undefined>;
  deleteResource: (id: number) => Promise<void>;
  updateResource: (card: Card) => Promise<void>;
  loading: boolean;
}

export type Card = {
  id: number;
  email: string;
  job_title: string;
  full_name: string;
  phone_number: string;
  linkedin: string;
  image_url: string;
  user_id: string;
  base_card: string;
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
      image_url
      base_card
    }
  }
`;

const CREATE_CARD = `
  mutation CreateCard(
    $email: String!,
    $job_title: String!,
    $full_name: String!,
    $phone_number: String!,
    $linkedin: String!,
    $base_card: String!,
  ) {
    create_business_card(
      email: $email, 
      job_title: $job_title, 
      full_name: $full_name, 
      phone_number: $phone_number, 
      linkedin: $linkedin, 
      base_card: $base_card,
    ) {
      image_url
    }
  }
`;

const DELETE_CARD = `
  mutation delete_business_card($id: Int!) {
    delete_business_card(id: $id){
      ... on DeleteBusinessCardSuccess {
        message
      }
      ... on NotFoundError {
        message
      }
      ... on NotAuthorizedError {
        message
      }
    }
  }
`;

const UPDATE_CARD = `
  mutation update_business_card(
    $id: Int!, 
    $email: String, 
    $job_title: String, 
    $full_name: String, 
    $phone_number: String, 
    $linkedin: String,
    $base_card: String,
  ) {
    update_business_card(
      id: $id, 
      email: $email, 
      job_title: $job_title, 
      full_name: $full_name, 
      phone_number: $phone_number, 
      linkedin: $linkedin,
      base_card: $base_card
    ) {
      ... on UpdateBusinessCardSuccess {
        business_card {
          id
          email
          job_title
          full_name
          phone_number
          linkedin
          image_url
          user_id
          base_card
        }
      }
      ... on NotFoundError {
        message
      }
      ... on NotAuthorizedError {
        message
      }
    }
  }
`;

const GET_DEFAULT_CARDS = `
  query {
    defaultCardImages
  }
`;

export function usePublicResource(apiUrl: string) {
  const fetchResource = async () => {
    try {
      const body = {
        query: GET_DEFAULT_CARDS,
      };
      const response = await fetch(apiUrl as RequestInfo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const responseJSON = await response.json();
      return responseJSON.data.defaultCardImages as [];
    } catch (err) {
      console.error(err);
    }
  };

  const { data, error } = useSWR("public_resources", fetchResource);
  return {
    publicResources: data as string[] | undefined,
    loading: !error && !data,
  };
}

export function usePrivateResource(apiUrl: string) {
  const fetchResource = async () => {
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
  };

  const createResource = async (card: CardRequest) => {
    try {
      const session = await supabase.auth.getSession();
      const tokens = session?.data?.session?.access_token;

      const body = {
        query: CREATE_CARD,
        variables: card,
      };

      const response = await fetch(apiUrl as RequestInfo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      mutate();
      return data?.data?.create_business_card?.image_url;
    } catch (err) {
      console.error(err);
    }
  };

  const deleteResource = async (id: number) => {
    try {
      const session = await supabase.auth.getSession();
      const tokens = session?.data?.session?.access_token;
      console.log("deleting card");

      const body = {
        query: DELETE_CARD,
        variables: { id: id },
      };

      const response = await fetch(apiUrl as RequestInfo, {
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
  };

  const updateResource = async (card: Card) => {
    try {
      const session = await supabase.auth.getSession();
      const tokens = session?.data?.session?.access_token;

      const body = {
        query: UPDATE_CARD,
        variables: card,
      };

      const response = await fetch(apiUrl as RequestInfo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens}`,
        },
        body: JSON.stringify(body),
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const { data, error, mutate } = useSWR("business_cards", fetchResource);
  return {
    resources: data as Card[] | undefined,
    createResource,
    deleteResource,
    updateResource,
    loading: !error && !data,
  };
}
