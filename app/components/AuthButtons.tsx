"use client"
import React from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./functions";

const AuthButtons: React.FC = () => {
  const signedIn = useAuth();

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <div>
      {!signedIn ? (
        <button
          onClick={signInWithGoogle}
          className="btn btn-primary"
        >
          Sign in to get Started
        </button>
      ) : (
        <button
          onClick={signOut}
          className="btn btn-error"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default AuthButtons;
