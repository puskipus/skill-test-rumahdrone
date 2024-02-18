import React from "react";

export default function Forbidden() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">403 Forbidden</h1>
        <p className="text-lg mt-4">
          You don't have permission to access this page.
        </p>
      </div>
    </div>
  );
}
