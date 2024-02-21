import { Link } from "react-router-dom";

function DownloadButton({ onCLick }) {
  return (
    <Link
      onClick={onCLick}
      className="text-white text-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Download
    </Link>
  );
}

export default DownloadButton;
