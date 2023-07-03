"use client";
import React, { SyntheticEvent } from "react";
import {
  CardRequest,
  Card,
  DigitalCard,
  DigitalCardRequest,
} from "./useResource";

type RequestType = CardRequest | DigitalCardRequest;
type FormProps = {
  formType: "image" | "digital" | "digital-create";
  initialValues?: Card | DigitalCard;
  onSubmit: (values: CardRequest | DigitalCardRequest) => void;
  onCancel?: () => void;
  slugValidation?: {
    unique: boolean;
    message: string;
  };
};
const isCard = (object: any): object is Card => {
  return "base_card" in object;
};

const Form: React.FC<FormProps> = ({
  formType,
  initialValues,
  onSubmit,
  onCancel,
  slugValidation,
}) => {
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    let values: RequestType;

    if (initialValues && isCard(initialValues)) {
      values = {
        email: (formData.get("email") as string) || initialValues.email || "",
        job_title:
          (formData.get("job_title") as string) ||
          initialValues.job_title ||
          "",
        full_name:
          (formData.get("full_name") as string) ||
          initialValues.full_name ||
          "",
        phone_number:
          (formData.get("phone_number") as string) ||
          initialValues.phone_number ||
          "",
        website:
          (formData.get("website") as string) || initialValues.website || "",
        base_card: initialValues.base_card,
      } as CardRequest;
    } else {
      values = {
        email: (formData.get("email") as string) || initialValues?.email || "",
        profile_pic: (formData.get("profile_pic") as string) || initialValues?.profile_pic || "",
        job_title:
          (formData.get("job_title") as string) ||
          initialValues?.job_title ||
          "",
        full_name:
          (formData.get("full_name") as string) ||
          initialValues?.full_name ||
          "",
        phone_number:
          (formData.get("phone_number") as string) ||
          initialValues?.phone_number ||
          "",
        website:
          (formData.get("website") as string) || initialValues?.website || "",
        slug: (formData.get("slug") as string) || initialValues?.slug || "",
      } as DigitalCardRequest;
    }

    onSubmit(values);
  };

  return (
    <div className="py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 max-w-xl  mx-auto lg:min-w-32">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -rotate-6 rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-slate-600 shadow-lg rounded-3xl p-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            Full Name
            <input
              type="text"
              name="full_name"
              placeholder=""
              className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
            />
            <div>
              Job title
              <input
                type="text"
                name="job_title"
                placeholder=""
                className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
              />
            </div>
            <div>
              Email
              <input
                type="email"
                name="email"
                placeholder=""
                className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
              />
            </div>
            <div>
              Phone Number
              <input
                type="text"
                name="phone_number"
                placeholder=""
                className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
              />
            </div>
            <div>
              Website / LinkedIn
              <input
                type="text"
                name="website"
                placeholder="linkedin.com/in/example/"
                className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
              />
            </div>
            {(formType === "digital" || formType === "digital-create") && (
              <>
                <div>
                  Profile Picture URL
                  <input
                    type="text"
                    name="profile_pic"
                    placeholder="copy linkedin profile url"
                    className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
                  />
                </div>
                <div>
                  Slug (suffix of website)
                  <input
                    type="text"
                    name="slug"
                    placeholder="your-name"
                    className={`block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none ${
                      slugValidation && !slugValidation.unique
                        ? "border-red-600"
                        : ""
                    }`}
                  />
                  {slugValidation && !slugValidation.unique && (
                    <div className="text-red-600 text-xs mt-1">
                      {slugValidation.message}
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="flex justify-evenly">
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-200 to-teal-400 text-gray-800 font-semibold py-3 px-6 rounded-md"
              >
                Submit
              </button>
              {formType !== "digital-create" && (
                <button
                  type="button"
                  className="bg-red-500 text-white font-semibold py-3 px-6 rounded-md"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
