import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import timeSince from "../../helper/timeSince";
import { Accordion, AccordionBody } from "@material-tailwind/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ImageModal from "./ImageModal";

export default function UserDetailsModal({ user }) {
  const [open, setOpen] = useState(false);
  const [accordion, setAccordion] = useState(false);
  const [namazTime, setNamazTime] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const handleOpen = (value) => {
    setAccordion(accordion === value ? 0 : value);
  };

  useEffect(() => {
    const controller = new AbortController();
    const getNamazTime = async () => {
      try {
        const response = await axiosPrivate.get(`/mosque/${user._id}`, {
          signal: controller.signal,
        });
        for (const key in response.data) {
          setNamazTime((prev) => {
            if (
              key !== "username" &&
              key !== "mosqueName" &&
              key !== "_id" &&
              key !== "__v"
            ) {
              return [...prev, [key, response.data[key]]];
            } else {
              return prev;
            }
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    getNamazTime();
  }, [axiosPrivate, user]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className=" text-blue-400 flex transition-colors duration-200 hover:text-blue-500 focus:outline-none gap-2"
      >
        <svg
          width="17"
          height="17"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
          <path d="M12 8h.01"></path>
          <path d="M11 12h1v4h1"></path>
        </svg>
      </button>
      {open ? (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                          <button
                            type="button"
                            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </Transition.Child>
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 flex justify-between">
                            User Details
                            {user.newUser ? (
                              <span className=" text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full bg-red-600 ">
                                New
                              </span>
                            ) : null}
                          </Dialog.Title>
                          <ImageModal file={user.imageUrl} />
                          <div className="flex justify-between mt-3"></div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          {/* Replace with your content */}

                          <div className="absolute inset-0 px-4 sm:px-6">
                            <div
                              className="h-full border-2 border-dashed border-gray-200"
                              aria-hidden="true"
                            >
                              <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                                    Applicant Information
                                  </h3>
                                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Personal details and application.
                                  </p>
                                </div>
                                <div className="border-t border-gray-200">
                                  <dl>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                      <dt className="text-sm font-medium text-gray-500">
                                        User name
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <div className="flex items-center justify-between">
                                          {user.username}
                                          {user.roles["Admin"] === 5150 ? (
                                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                              Admin
                                            </p>
                                          ) : (
                                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                              User
                                            </p>
                                          )}
                                        </div>
                                      </dd>
                                    </div>
                                    <div className=" bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                      <dt className="text-sm font-medium text-gray-500">
                                        Full name
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <div className="flex items-center justify-between">
                                          {user.name}
                                        </div>
                                      </dd>
                                    </div>
                                    <div className=" bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                      <dt className="text-sm font-medium text-gray-500">
                                        Mosque Name
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <div className="flex items-center justify-between">
                                          {user.mosqueName}
                                        </div>
                                      </dd>
                                    </div>
                                    <div className=" bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                      <dt className="text-sm font-medium text-gray-500">
                                        Mosque Name
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <div className="flex items-center justify-between">
                                          {user.mosqueAddress}
                                        </div>
                                      </dd>
                                    </div>

                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                      <dt className="text-sm font-medium text-gray-500">
                                        Application status
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {user.isApproved === "Approved" && (
                                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                                            <svg
                                              width="12"
                                              height="12"
                                              viewBox="0 0 12 12"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M10 3L4.5 8.5L2 6"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>

                                            <h2 className="text-sm font-normal">
                                              Accepted
                                            </h2>
                                          </div>
                                        )}{" "}
                                        {user.isApproved === "Pending" && (
                                          <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-emerald-100/60 ">
                                            {/*svg for pending */}
                                            <svg
                                              width="12"
                                              height="12"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              viewBox="0 0 24 24"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path d="M6.5 7h11"></path>
                                              <path d="M6.5 17h11"></path>
                                              <path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Z"></path>
                                              <path d="M6 4v2a6 6 0 1 0 12 0V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v0Z"></path>
                                            </svg>

                                            <h2 className="text-sm font-normal">
                                              Pending
                                            </h2>
                                          </div>
                                        )}
                                        {user.isApproved === "Rejected" && (
                                          <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2  bg-emerald-100/60 ">
                                            <svg
                                              width="12"
                                              height="12"
                                              viewBox="0 0 12 12"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M9 3L3 9M3 3L9 9"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>

                                            <h2 className="text-sm font-normal">
                                              Rejected
                                            </h2>
                                          </div>
                                        )}
                                      </dd>
                                    </div>
                                    <div className=" bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                      <dt className="text-sm font-medium text-gray-500">
                                        Email address
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {user.email}
                                      </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                      <dt className="text-sm font-medium text-gray-500">
                                        Phone Number
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {user.phonenumber}
                                      </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:gap-4 sm:px-6">
                                      <Fragment>
                                        <Accordion open={accordion === 1}>
                                          <h1
                                            onClick={() => handleOpen(1)}
                                            className="flex justify-between cursor-pointer text-sm font-medium text-gray-500"
                                          >
                                            Namaz Timings
                                            {accordion === 1 ? (
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
                                              >
                                                <path d="M5 12h14"></path>
                                              </svg>
                                            ) : (
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
                                              >
                                                <path d="M12 5v14"></path>
                                                <path d="M5 12h14"></path>
                                              </svg>
                                            )}
                                          </h1>
                                          <AccordionBody>
                                            {namazTime.length > 0 ? (
                                              namazTime.map((time, i) => (
                                                <div
                                                  className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                                  key={i}
                                                >
                                                  <dt className="text-sm font-medium text-gray-500">
                                                    {time[0]}
                                                  </dt>
                                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                    {time[0] === "lastModified"
                                                      ? timeSince(time[1])
                                                      : time[1]}
                                                  </dd>
                                                </div>
                                              ))
                                            ) : (
                                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                  No timings added
                                                </dt>
                                              </div>
                                            )}
                                          </AccordionBody>
                                        </Accordion>
                                      </Fragment>
                                    </div>

                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                      <dt className="text-sm font-medium text-gray-500">
                                        Address
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {user.address}
                                      </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                      <dt className="text-sm font-medium text-gray-500">
                                        Attachments
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                            <div className="flex w-0 flex-1 items-center">
                                              <PaperClipIcon
                                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                aria-hidden="true"
                                              />
                                              <span className="ml-2 w-0 flex-1 truncate">
                                                proof
                                              </span>
                                            </div>
                                            <div className="ml-4 flex-shrink-0 flex gap-1">
                                              <a
                                                href={user.imageUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                              >
                                                View
                                              </a>
                                            </div>
                                          </li>
                                        </ul>
                                      </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                      <dt className="text-sm font-medium text-gray-500">
                                        Applied on
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2  border border-gray-500">
                                          <svg
                                            aria-hidden="true"
                                            className="w-3 h-3 mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                              clipRule="evenodd"
                                            ></path>
                                          </svg>
                                          {timeSince(user.createdAt)}
                                        </span>
                                      </dd>
                                    </div>

                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                      <dt className="text-sm font-medium text-gray-500">
                                        Last updated
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded  border border-blue-400">
                                          <svg
                                            aria-hidden="true"
                                            className="w-3 h-3 mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                              clipRule="evenodd"
                                            ></path>
                                          </svg>
                                          {timeSince(user.updatedAt)}
                                        </span>
                                      </dd>
                                    </div>
                                  </dl>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /End replace */}
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : null}
    </>
  );
}
