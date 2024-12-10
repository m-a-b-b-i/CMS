import { Fragment, useState } from "react";
import { useEffect } from "react";
import { Tooltip } from "@material-tailwind/react";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import useContent from "../hooks/useContent";
import MosqueInfo from "./modals/MosqueInfo";
import timeSince from "../helper/timeSince";
import formatTime from "../helper/formatTime";

const ShowNamazTime = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { bookmark, setBookmark } = useContent();
  const postsPerPage = 2;

  useEffect(() => {
    let timer;
    if (search && data) {
      timer = setTimeout(() => {
        setFilteredData(
          data.filter((item) =>
            item.mosqueName.toLowerCase().includes(search.toLowerCase())
          )
        );
      }, 500);
    } else {
      setFilteredData(undefined);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [data, search]);

  let lastPostIndex = currentPage * postsPerPage;
  let firstPostIndex = lastPostIndex - postsPerPage;

  let currentPosts;
  if (!filteredData) {
    currentPosts = data.slice(firstPostIndex, lastPostIndex);
  } else {
    currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);
  }

  return (
    <section>
      {!currentPosts ? (
        <Loading />
      ) : (
        <section className="text-white">
          <div className="flex justify-end mr-10 mb-4">
            <div className="flex border-b w-4/5 sm:w-auto border-white py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Mosque name..."
                aria-label="Full name"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {currentPosts.length === 0 ? (
            <h1 className="text-center">No Mosque found</h1>
          ) : (
            <section>
              <section className="grid sm:grid-cols-2 gap-3 content-center">
                {currentPosts.map((ele) => (
                  <section
                    key={ele._id}
                    className="sm:mx-10 mx-5 overflow-x-auto shadow-md rounded-lg"
                  >
                    <table className="w-full text-sm text-left border-separate border-spacing-2 border border-slate-500 text-gray-400 overflow-hidden">
                      <tbody>
                        <tr className=" border-b bg-secondary-dark-bg border-gray-700">
                          <td
                            className="px-6 py-4 text-white text-center"
                            colSpan={2}
                          >
                            <div className="flex justify-between">
                              <h2 className="pt-2">{ele.mosqueName}</h2>

                              <div className="flex justify-between w-20 mt-2">
                                {bookmark.some((e) => e._id === ele._id) ? (
                                  <Fragment>
                                    <Tooltip
                                      content="Remove from bookmark"
                                      placement="bottom"
                                    >
                                      <svg
                                        width="21"
                                        height="21"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        alt="bookmark"
                                        className=" cursor-pointer"
                                        data-tooltip-target="tooltip-default"
                                        onClick={() =>
                                          setBookmark(
                                            bookmark.filter(
                                              (item) => item._id !== ele._id
                                            )
                                          )
                                        }
                                      >
                                        <path d="M6 4.8a2.4 2.4 0 0 1 2.4-2.4h7.2A2.4 2.4 0 0 1 18 4.8v16.8l-6-3-6 3V4.8Z"></path>
                                      </svg>
                                    </Tooltip>
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    <Tooltip
                                      content="Add to bookmark"
                                      placement="bottom"
                                    >
                                      <svg
                                        width="21"
                                        height="21"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        alt="bookmark"
                                        className=" cursor-pointer"
                                        data-tooltip-target="tooltip-default"
                                        onClick={() =>
                                          setBookmark([...bookmark, ele])
                                        }
                                      >
                                        <path d="M5.586 3.586A2 2 0 0 0 5 5v16l7-3.5 7 3.5V5a2 2 0 0 0-2-2H7a2 2 0 0 0-1.414.586Z"></path>
                                      </svg>
                                    </Tooltip>
                                  </Fragment>
                                )}
                                <Fragment>
                                  <Tooltip
                                    content="Mosque details"
                                    placement="bottom"
                                  >
                                    <MosqueInfo userId={ele.userId} />
                                  </Tooltip>
                                </Fragment>
                              </div>

                              {/* <div className="group relative inline-block">
                                <img
                                  src="https://img.icons8.com/dotty/35/ffffff/add-bookmark.png"
                                  alt="bookmark"
                                  className=" cursor-pointer"
                                  data-tooltip-target="tooltip-default"
                                />
                                <div className="bg-blue-500 absolute top-full left-1/2 z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100">
                                  <span className="bg-blue-500 absolute top-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm"></span>
                                  Bookmark
                                </div>
                              </div> */}
                            </div>
                          </td>
                        </tr>

                        <tr className="border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Fajr
                          </th>
                          <td className="px-6 py-4">{formatTime(ele.fajr)}</td>
                        </tr>
                        <tr className="border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Zuhr
                          </th>
                          <td className="px-6 py-4">{formatTime(ele.zuhr)}</td>
                        </tr>

                        <tr className="border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Asr
                          </th>
                          <td className="px-6 py-4">{formatTime(ele.asr)}</td>
                        </tr>
                        <tr className="border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Magrib
                          </th>
                          <td className="px-6 py-4">
                            {formatTime(ele.magrib)}
                          </td>
                        </tr>
                        <tr className="border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Isha
                          </th>
                          <td className="px-6 py-4">{formatTime(ele.isha)}</td>
                        </tr>
                        <tr className="border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Juma
                          </th>
                          <td className="px-6 py-4">{formatTime(ele.juma)}</td>
                        </tr>
                        <tr className=" border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Last Update
                          </th>
                          <td className="px-6 py-4 ">
                            {timeSince(ele.lastModified)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                ))}
              </section>
              <section className="sm:px-10 px-5">
                <Pagination
                  totalPosts={filteredData ? filteredData.length : data.length}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </section>
            </section>
          )}
        </section>
      )}
    </section>
  );
};

export default ShowNamazTime;
