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
import SelectInput from "../../components/Input/SelectInput";

export default function ManajemenStokAdd() {
  const navigate = useNavigate();

  const [inventaris, setInventaris] = useState([]);
  const [form, setForm] = useState({
    namaBarang: "",
    jenis: "",
    keterangan: "",
    jumlah: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchInventaris = async () => {
    try {
      const res = await getData(`/inventaris`);
      let data = [];
      res.data.forEach((element) => {
        data.push(element.namaBarang);
      });

      setInventaris(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Anda yakin mengatur stok barang ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const res = await postData(`/stok`, form);
      // console.log(res.response.data.error);
      console.log(res);

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

        navigate("/stok");
      } else {
        toast.error(res.response.data.error, {
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
    fetchInventaris();
  }, []);

  console.log(form);

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-3xl">Atur Stok Baru</h1>

          <form className="max-w-sm mt-16" onSubmit={handleSubmit}>
            <SelectInput
              id="namaBarang"
              name="namaBarang"
              label="Nama Barang"
              options={inventaris}
              onChange={handleChange}
            />
            <SelectInput
              id="jenis"
              name="jenis"
              label="Jenis Stok"
              options={["Barang Masuk", "Barang Keluar"]}
              onChange={handleChange}
            />
            <TextArea
              type={"text"}
              label="Keterangan"
              id="keterangan"
              name="keterangan"
              onChange={handleChange}
              required
            />
            <Input
              type={"text"}
              label="Jumlah Stok"
              id="jumlah"
              name="jumlah"
              placeholder="10"
              onChange={handleChange}
              required
            />
            <SubmitButton label={"Tambahkan Barang"} />
          </form>
        </div>
      </div>
    </div>
  );
}
