import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div>
            <h1 className="text-5xl text-center">Selamat Datang</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
