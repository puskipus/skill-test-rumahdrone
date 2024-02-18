import React, { useState } from "react";
import { postData } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LogoBrand from "../components/LogoBrand";
import Input from "../components/Input/Input";
import SubmitButton from "../components/Button/SubmitButton";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await postData(`/auth/login`, form);

    if (res?.data) {
      const { access_token, role } = res.data;
      localStorage.setItem("token", JSON.stringify(access_token));
      localStorage.setItem("role", JSON.stringify(role));

      toast.success("Login berhasil", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate("/dashboard");
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
  };

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <LogoBrand />
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <Input
                  type={"email"}
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="email@example.com"
                  onChange={handleChange}
                  required={true}
                />
                <Input
                  type={"password"}
                  label="Password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required={true}
                />
                <SubmitButton label={"Login"}></SubmitButton>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
