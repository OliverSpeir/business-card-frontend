"use client"
import React, { useState, useEffect } from "react";
import {supabase} from './supabaseClient';

const AuthButtons: React.FC = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      // console.log(data);
      setSignedIn(data !== null);
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // console.log(session);
        setSignedIn(session !== null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <button
          onClick={signOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default AuthButtons;
