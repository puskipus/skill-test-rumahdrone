import React from "react";

export default function SubmitButton({ label }) {
  return (
    <button
      type="submit"
      className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      {label}
    </button>
  );
}
