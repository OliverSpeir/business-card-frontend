"use client"
import React, { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "http://127.0.0.1:8000/graphql";
    const body = {
      query: `
        mutation {
          create_business_card(
            email: "${email}", 
            job_title: "${jobTitle}", 
            full_name: "${name}", 
            phone_number: "${phoneNumber}", 
            linkedin: "${linkedin}", 
            style: "style", 
            theme: "theme"
          ) {
            email
            job_title
            full_name
            phone_number
            linkedin
            style
            theme
          }
        }
      `,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Success!", data);
      } else {
        console.log("Error", data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-slate-600 shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
            />
            <input
              type="text"
              placeholder="Job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
            />
            <input
              type="text"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
            />
            <input
              type="text"
              placeholder="LinkedIn"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
            />
            <button
              type="submit"
              className="mt-8 bg-gradient-to-r from-teal-200 to-teal-400 text-gray-800 font-semibold py-3 px-6 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
