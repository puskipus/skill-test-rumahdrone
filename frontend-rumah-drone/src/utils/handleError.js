import { toast } from "react-toastify";

const handleError = (error) => {
  if (error.response.data.error === "Unauthorized") {
    toast.info("Sesi Anda telah habis, silakan login ulang", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    localStorage.clear();
    window.location.replace("/");
  }

  return error;
};

export default handleError;
