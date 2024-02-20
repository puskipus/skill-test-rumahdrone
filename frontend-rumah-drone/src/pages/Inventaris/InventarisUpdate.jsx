import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import { getData, postData } from "../../utils/fetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SubmitButton from "../../components/Button/SubmitButton";
import Input from "../../components/Input/Input";
import TextArea from "../../components/Input/TextArea";
import { useParams } from "react-router-dom";

export default function InventarisUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    namaBarang: "",
    deskripsi: "",
    harga: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Anda yakin mengupdate barang ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const res = await postData(`/inventaris`, form);

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

        navigate("/inventaris");
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

  const fetchInventaris = async () => {
    try {
      const res = await getData(`/inventaris/${id}`);
      const {
        namaBarang = "",
        deskripsi = "",
        harga = "",
        stock = "",
      } = res.data[0];

      setForm({ namaBarang, deskripsi, harga, stock });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInventaris();
  }, []);

  console.log(form);

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-3xl">Update Barang</h1>

          <form className="max-w-sm mt-16" onSubmit={handleSubmit}>
            <Input
              type={"text"}
              label="Nama Barang"
              id="namaBarang"
              name="namaBarang"
              placeholder="Drone XX"
              onChange={handleChange}
              required
              value={form.namaBarang}
            />
            <TextArea
              type={"text"}
              label="Deskripsi"
              id="deskripsi"
              name="deskripsi"
              onChange={handleChange}
              required
              value={form.deskripsi}
            />
            <Input
              type={"number"}
              label="Harga"
              id="harga"
              name="harga"
              placeholder="50000"
              onChange={handleChange}
              required
              value={form.harga}
            />
            <Input
              type={"text"}
              label="Stock Awal"
              id="stock"
              name="stock"
              placeholder="10"
              onChange={handleChange}
              required
              value={form.stock}
            />
            <SubmitButton label={"Tambahkan Barang"} />
          </form>
        </div>
      </div>
    </div>
  );
}
