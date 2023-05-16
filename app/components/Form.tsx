'use client';
import React, { FormEvent, useRef } from "react";

const Form = () => {
  const nameRef = useRef("");
  const jobTitleRef = useRef("");
  const emailRef = useRef("");
  const phoneNumberRef = useRef("");
  const linkedinRef = useRef("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = "https://example.com/api/v1/users";
    const body = {
      name: nameRef.current,
      jobTitle: jobTitleRef.current,
      email: emailRef.current,
      phoneNumber: phoneNumberRef.current,
      linkedin: linkedinRef.current,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();

        console.log("Success!", data);
      } else {
        console.log("Error", response.status);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full name" value={nameRef.current} />
          <input
            type="text"
            placeholder="Job title"
            value={jobTitleRef.current}
          />
          <input type="email" placeholder="Email" value={emailRef.current} />
          <input
            type="text"
            placeholder="Phone number"
            value={phoneNumberRef.current}
          />
          <input
            type="text"
            placeholder="LinkedIn"
            value={linkedinRef.current}
          />
          <button type="submit">Submit</button>
        </form>
  );
};

export default Form;
