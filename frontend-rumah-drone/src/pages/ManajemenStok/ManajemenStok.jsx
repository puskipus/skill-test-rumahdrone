import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import AddButton from "../../components/Button/AddButton";
import { deleteData, getData } from "../../utils/fetch";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ManajemenStok() {
  const [inventaris, setInventaris] = useState([]);
  const [role, setRole] = useState("");

  const fetchInventaris = async () => {
    try {
      const res = await getData(`/inventaris`);
      console.log(res);

      setInventaris(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Anda yakin menghapus barang ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const res = await deleteData(`/inventaris/${id}`);

      if (res?.data?.message) {
        toast.success(res?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        fetchInventaris();
      } else {
        toast.error(res?.response?.data?.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  useEffect(() => {
    setRole(JSON.parse(localStorage.getItem("role")));
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
                      Harga
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Stock
                    </th>
                    {role === "admin" ? (
                      <th scope="col" class="px-6 py-3">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {inventaris.map((data, index) => (
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
                      <td className="px-6 py-4">{data.harga}</td>
                      <td className="px-6 py-4">{data.stock}</td>
                      {role === "admin" ? (
                        <td className="px-6 py-4 text-left">
                          <Link
                            to={`/inventaris/edit/${data.id}`}
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </Link>
                          <a
                            href="#"
                            className="ml-5 font-medium text-red-600 dark:text-red-500 hover:underline"
                            onClick={() => handleDelete(data.id)}
                          >
                            Delete
                          </a>
                        </td>
                      ) : null}
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
