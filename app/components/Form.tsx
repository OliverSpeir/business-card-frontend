// "use client";
// import React, { SyntheticEvent } from "react";
// import { CardRequest, Card } from "./useResource";

// type FormProps = {
//   initialValues?: Card;
//   onSubmit: (info: CardRequest) => void;
//   onCancel: () => void;
// };

// const Form: React.FC<FormProps> = ({ initialValues, onSubmit, onCancel }) => {
//   const handleSubmit = async (event: SyntheticEvent) => {
//     event.preventDefault();

//     const form = event.target as HTMLFormElement;
//     const formData = new FormData(form);

//     const cardInfo: CardRequest = {
//       email: (formData.get("email") as string) || initialValues?.email || "",
//       job_title:
//         (formData.get("job_title") as string) || initialValues?.job_title || "",
//       full_name:
//         (formData.get("full_name") as string) || initialValues?.full_name || "",
//       phone_number:
//         (formData.get("phone_number") as string) ||
//         initialValues?.phone_number ||
//         "",
//       website:
//         (formData.get("website") as string) || initialValues?.website || "",
//       base_card:
//         initialValues?.base_card ||
//         "this will be reset during onsubmit props passed from page",
//     };

//     onSubmit(cardInfo);
//   };

//   return (
//     <div className="py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-slate-600 shadow-lg sm:rounded-3xl sm:p-20">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="full_name"
//               placeholder="Full name"
//               className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
//             />
//             <input
//               type="text"
//               name="job_title"
//               placeholder="Job title"
//               className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
//             />
//             <input
//               type="text"
//               name="phone_number"
//               placeholder="Phone number"
//               className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
//             />
//             <input
//               type="text"
//               name="website"
//               placeholder="linkedin.com/in/example/"
//               className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
//             />
//             <div className="flex justify-between">
//               <button
//                 type="submit"
//                 className="bg-gradient-to-r from-teal-200 to-teal-400 text-gray-800 font-semibold py-3 px-6 rounded-md"
//               >
//                 Submit
//               </button>
//               <button
//                 type="button"
//                 className="bg-red-500 text-white font-semibold py-3 px-6 rounded-md"
//                 onClick={onCancel}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Form;
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
  formType: "image" | "digital";
  initialValues?: Card | DigitalCard;
  onSubmit: (values: CardRequest | DigitalCardRequest) => void;
  onCancel: () => void;
};
const isCard = (object: any): object is Card => {
  return "base_card" in object;
};

const Form: React.FC<FormProps> = ({
  formType,
  initialValues,
  onSubmit,
  onCancel,
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
              name="website"
              placeholder="linkedin.com/in/example/"
              className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
            />
            {/* {formType === "image" ? (
              <input
                type="text"
                name="image"
                className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
              />
            ) : (
              <input
                type="text"
                name="qr_code"
                placeholder="QR code"
                className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
              />
            )} */}
            {formType === "digital" && (
              <input
                type="text"
                name="slug"
                placeholder="your-name"
                className="block text-slate-600 text-sm py-3 px-4 rounded-md w-full border outline-none"
              />
            )}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-200 to-teal-400 text-gray-800 font-semibold py-3 px-6 rounded-md"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-red-500 text-white font-semibold py-3 px-6 rounded-md"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
