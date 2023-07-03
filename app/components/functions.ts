import { supabase } from "./supabaseClient";

export type Card = {
  id: number;
  email: string;
  job_title: string;
  full_name: string;
  phone_number: string;
  website: string;
  image_url: string;
  user_id: string;
  base_card: string;
};

export type DigitalCard = {
  id: number;
  email: string;
  job_title: string;
  full_name: string;
  phone_number: string;
  website: string;
  user_id: string;
  profile_pic: string;
  slug: string;
  qr_code: string;
};

export type DigitalCardRequest = Omit<
  DigitalCard,
  "user_id" | "qr_code" | "id"
>;
export type CardRequest = Omit<Card, "id" | "image_url" | "user_id">;

const GET_CARDS = `
  query {
    business_cards {
      id
      email
      job_title
      full_name
      phone_number
      website
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
    $website: String!,
    $base_card: String!,
  ) {
    create_business_card(
      email: $email, 
      job_title: $job_title, 
      full_name: $full_name, 
      phone_number: $phone_number, 
      website: $website, 
      base_card: $base_card,
    ) {
      image_url
    }
  }
`;

const DELETE_CARD = `
  mutation delete_business_card($id: Int!) {
    delete_business_card(id: $id){
      ... on DeleteSuccess {
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
    $website: String,
    $base_card: String,
  ) {
    update_business_card(
      id: $id, 
      email: $email, 
      job_title: $job_title, 
      full_name: $full_name, 
      phone_number: $phone_number, 
      website: $website,
      base_card: $base_card
    ) {
      ... on UpdateBusinessCardSuccess {
        business_card {
          id
          email
          job_title
          full_name
          phone_number
          website
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

const GET_DIGITAL_CARDS = `
  query {
    digital_cards {
      id
      email
      job_title
      full_name
      phone_number
      website
      user_id
      profile_pic
      slug
      qr_code
    }
  }
`;

const CREATE_DIGITAL_CARD = `
  mutation create_dgital_card(
    $email: String!,
    $job_title: String!,
    $full_name: String!,
    $phone_number: String!,
    $website: String!,
    $profile_pic: String!,
    $slug: String!,
  ) {
    create_digital_card(
      email: $email, 
      job_title: $job_title, 
      full_name: $full_name, 
      phone_number: $phone_number, 
      website: $website, 
      profilePic: $profile_pic,
      slug: $slug
    ) {
      qr_code
    }
  }
`;

const DELETE_DIGITAL_CARD = `
  mutation delete_digital_card($id: Int!) {
    delete_digital_card(id: $id){
      ... on DeleteSuccess {
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

const UPDATE_DIGITAL_CARD = `
  mutation update_digital_card(
    $id: Int!, 
    $email: String, 
    $job_title: String, 
    $full_name: String, 
    $phone_number: String, 
    $website: String,
    $profile_pic: String,
    $slug: String,
  ) {
    update_digital_card(
      id: $id, 
      email: $email, 
      job_title: $job_title, 
      full_name: $full_name, 
      phone_number: $phone_number, 
      website: $website,
      profile_pic: $profile_pic,
      slug: $slug
    ) {
      ... on UpdateDigitalCardSuccess {
        digital_card {
          id
          email
          job_title
          full_name
          phone_number
          website
          user_id
          profile_pic
          slug
          qr_code
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

export async function fetchPublicResource() {
  try {
    const PublicApiUrl = process.env.NEXT_PUBLIC_GRAPHQL_PUBLIC_API_URL;
    if (!PublicApiUrl) {
      throw new Error("NEXT_PUBLIC_GRAPHQL_PUBLIC_API_URL is not defined");
    }
    const body = {
      query: GET_DEFAULT_CARDS,
    };
    const response = await fetch(PublicApiUrl, {
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
}

export async function fetchImageResource() {
  try {
    console.log("fetching images")
    const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
    }
    const session = await supabase.auth.getSession();
    const tokens = session?.data?.session?.access_token;

    const body = {
      query: GET_CARDS,
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      body: JSON.stringify(body),
    });
    console.log("images fetched")
    const responseJSON = await response.json();
    return responseJSON.data.business_cards as Card[];
  } catch (err) {
    console.error(err);
  }
}

export async function fetchDigitalCardResource() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
    }
    const session = await supabase.auth.getSession();
    const token = session?.data?.session?.access_token;

    const body = {
      query: GET_DIGITAL_CARDS,
    };
    const response = await fetch(apiUrl as RequestInfo, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const responseJSON = await response.json();
    return responseJSON.data.digital_cards as DigitalCard[];
  } catch (err) {
    console.error(err);
  }
}

export async function createImageResource(card: CardRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
    }
    const session = await supabase.auth.getSession();
    const token = session?.data?.session?.access_token;
    const body = {
      query: CREATE_CARD,
      variables: card,
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data?.data?.create_business_card?.image_url;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteImageResource(id: Number) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
    }
    const session = await supabase.auth.getSession();
    const token = session?.data?.session?.access_token;
    const body = {
      query: DELETE_CARD,
      variables: { id: id },
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const confirmation = response.json();
    return confirmation;
  } catch (err) {
    console.error(err);
  }
}

export async function updateImageResource(card: Card) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
    }
    const session = await supabase.auth.getSession();
    const token = session?.data?.session?.access_token;
    const body = {
      query: UPDATE_CARD,
      variables: card,
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const confirmation = response.json();
    return confirmation;
  } catch (err) {
    console.error(err);
  }
}

export async function createDigitalResource(card: DigitalCardRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
    }
    const session = await supabase.auth.getSession();
    const token = session?.data?.session?.access_token;
    const body = {
      query: CREATE_DIGITAL_CARD,
      variables: card,
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data?.data?.create_digital_card?.qr_code;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteDigitalResource(id: Number) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
    }
    const session = await supabase.auth.getSession();
    const token = session?.data?.session?.access_token;
    const body = {
      query: DELETE_DIGITAL_CARD,
      variables: { id: id },
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(err);
  }
}

export async function updateDigitalResource(card: DigitalCard) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_GRAPHQL_API_URL is not defined");
    }
    const session = await supabase.auth.getSession();
    const token = session?.data?.session?.access_token;
    const body = {
      query: UPDATE_DIGITAL_CARD,
      variables: card,
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(err);
  }
}
