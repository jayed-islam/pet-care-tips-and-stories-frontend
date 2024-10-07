import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

export const metadata = {
  title: "404",
};

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <div className="mb-8">
          <FiAlertTriangle className="text-9xl text-red-500 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link href="/">
          <a className="text-white bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition-all duration-300">
            Go back to Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
