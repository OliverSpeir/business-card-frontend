"use client"
import React, { useState, useEffect } from "react";
import {supabase} from './supabaseClient';

type AuthButtonsProps = {
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signedIn: boolean;
};

const AuthButtons: React.FC<AuthButtonsProps> = ({setSignedIn, signedIn}) => {

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      // console.log(data);
      setSignedIn(data !== null);
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // console.log(await supabase.auth.getSession())
        // console.log(await supabase.auth.getUser())
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
