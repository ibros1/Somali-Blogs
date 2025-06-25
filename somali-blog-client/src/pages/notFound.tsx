import { useNavigate } from "react-router-dom";
import notFoundImage from "../assets/not-found.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="text-center bg-white p-6 py-16  w-full max-w-lg">
        <img
          src={notFoundImage}
          alt="Not Found"
          className="mx-auto mb-6 w-48 h-auto"
        />
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className=" cursor-pointer px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
