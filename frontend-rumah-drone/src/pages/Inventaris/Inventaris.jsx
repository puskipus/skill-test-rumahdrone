import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import AddButton from "../../components/Button/AddButton";
import { getData } from "../../utils/fetch";
import { Link } from "react-router-dom";

export default function Inventaris() {
  const [loading, setLoading] = useState(false);
  const [inventaris, setInventaris] = useState("");

  const fetchInventaris = async () => {
    try {
      setLoading(true);
      const res = await getData(`/inventaris`);
      console.log(res);

      setInventaris(res.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInventaris();
  }, []);
  return (
    <>
      <div>
        <Navbar />
        <Sidebar />

        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl">Inventaris Barang</h1>
              <AddButton to="/inventaris/add" />
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
                      Harga
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Stock
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inventaris.map((data, index) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data.namaBarang}
                      </th>
                      <td class="px-6 py-4">{data.harga}</td>
                      <td class="px-6 py-4">{data.stock}</td>
                      <td class="px-6 py-4 text-left">
                        <Link
                          to={"/inventaris/edit"}
                          href="#"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                        <a
                          href="#"
                          class="ml-5 font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </a>
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
