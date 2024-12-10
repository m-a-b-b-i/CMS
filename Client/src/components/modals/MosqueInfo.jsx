import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "../../api/axios";
import useContent from "../../hooks/useContent";

const MosqueInfo = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [UserInfo, setUserInfo] = useState({});
  const cancelButtonRef = useRef(null);
  const { screenSize } = useContent();

  const handleClick = () => {
    setShowModal(true);
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`/manageuser/${userId}`);
        setUserInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUserInfo();
  };

  return (
    <div className="flex justify-center">
      <div className="shrink-0">
        <svg
          width="21"
          height="21"
          fill="none"
          stroke="#f7f7f7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
          onClick={handleClick}
        >
          <path d="M12 8h.01"></path>
          <path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"></path>
          <path d="M11 12h1v4h1"></path>
        </svg>
      </div>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setShowModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="w-full h-full p-4 bg-white rounded-lg shadow-lg">
                        <div className="mt-2">
                          <div className="flex flex-col gap-1">
                            <div className="flex gap-2 text-xs sm:text-base">
                              {screenSize > 768 ? (
                                <svg
                                  width="21"
                                  height="21"
                                  fill="none"
                                  stroke="#4d3ad9"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
                                  <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                                  <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"></path>
                                </svg>
                              ) : (
                                <p>Owner: </p>
                              )}

                              <p>{UserInfo.name}</p>
                            </div>
                            <div className="flex gap-2 text-xs sm:text-base">
                              {screenSize > 768 ? (
                                <svg
                                  width="21"
                                  height="21"
                                  fill="none"
                                  stroke="#4d3ad9"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path>
                                  <path d="m3 7 9 6 9-6"></path>
                                </svg>
                              ) : (
                                <p>Mail: </p>
                              )}
                              <p>{UserInfo.email}</p>
                            </div>
                            <div className="mx-auto lg:mx-0 w-full pt-3 border-b-2 border-blue-500 opacity-25"></div>

                            <div className="flex gap-2 text-xs sm:text-base">
                              {screenSize > 768 ? (
                                <>
                                  <svg
                                    width="21"
                                    height="21"
                                    fill="none"
                                    stroke="#4d3ad9"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="m21 3-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1L21 3Z"></path>
                                  </svg>
                                </>
                              ) : (
                                <p>Location: </p>
                              )}
                              <p>{UserInfo.mosqueAddress}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default MosqueInfo;
