import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import AddButton from "../../components/Button/AddButton";
import { deleteData, getData } from "../../utils/fetch";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { formatDate } from "../../utils/formatDate";

export default function ManajemenStok() {
  const [stok, setStok] = useState([]);
  const [role, setRole] = useState("");

  const fetchStok = async () => {
    try {
      const res = await getData(`/stok`);
      setStok(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRole(JSON.parse(localStorage.getItem("role")));
    fetchStok();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <Sidebar />

        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl">Manajemen Stok</h1>
              {role === "staff" ? <AddButton to="/stok/add" /> : null}
            </div>

            {/* table */}
            <div class="mt-14 relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Nama Barang
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Jenis
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Keterangan
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Jumlah
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Tanggal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stok.map((data, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data.namaBarang}
                      </th>
                      <td className="px-6 py-4">{data.jenis}</td>
                      <td className="px-6 py-4">{data.keterangan}</td>
                      <td className="px-6 py-4">{data.jumlah}</td>
                      <td className="px-6 py-4">
                        {formatDate(data.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
