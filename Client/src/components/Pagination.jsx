import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      <div className="flex items-center justify-between mt-6">
        <button
          className="flex items-center px-5 py-2 text-sm  capitalize transition-colors duration-200 border rounded-md gap-x-2  bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800"
          onClick={() => {
            if (currentPage === 1) {
              return;
            }
            setCurrentPage(currentPage - 1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
        </button>
        <div className="items-center hidden md:flex gap-x-3">
          {pages.map((page, i) => (
            <>
              <p
                key={i}
                onClick={() => setCurrentPage(page)}
                className={
                  page === currentPage
                    ? "px-2 py-1 text-sm text-blue-500 rounded-md bg-gray-800"
                    : "px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300"
                }
              >
                {page}
              </p>
            </>
          ))}
        </div>
        <button
          className="flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200 border rounded-md gap-x-2  bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800"
          onClick={() => {
            if (currentPage === pages.length) {
              return;
            }
            setCurrentPage(currentPage + 1);
          }}
        >
          <p className="text-sm font-medium leading-none mr-3">Next</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
