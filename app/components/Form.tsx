"use client";
import React, {SyntheticEvent} from "react";
import {CardRequest, Card} from "./useResource";

type FormProps = {
  initialValues?: Card;
  onSubmit: (info: CardRequest) => void;
};

const Form: React.FC<FormProps> = ({ initialValues, onSubmit }) => {
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const cardInfo: CardRequest = {
      email: (formData.get("email") as string) || "",
      job_title: (formData.get("job_title") as string) || "",
      full_name: (formData.get("full_name") as string) || "",
      phone_number: (formData.get("phone_number") as string) || "",
      linkedin: (formData.get("linkedin") as string) || "",
      style: "style",
      theme: "theme",
    };

    onSubmit(cardInfo);
  };

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-slate-600 shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="full_name"
              placeholder="Full name"
              className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
            />
            <input
              type="text"
              name="job_title"
              placeholder="Job title"
              className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone number"
              className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
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
