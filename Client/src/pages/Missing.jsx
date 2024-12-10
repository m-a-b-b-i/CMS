import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <article className=" mt-40 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-gray-100 mb-8">404</h1>
      <p className="sm:text-2xl text-gray-400 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
      >
        Go back to home
      </Link>
    </article>
  );
};

export default Missing;
