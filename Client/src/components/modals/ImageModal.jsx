import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ImageModal = ({ file }) => {
  const [showModal, setShowModal] = useState(false);
  const cancelButtonRef = useRef(null);
  return (
    <div className="flex justify-center">
      <div className="shrink-0">
        <img
          className="object-cover w-16 h-16 rounded-full cursor-pointer"
          src={
            file
              ? typeof file === "string"
                ? file
                : URL.createObjectURL(file)
              : "https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143__340.png"
          }
          alt="profile"
          onClick={() => setShowModal(true)}
        />
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
                          <img
                            src={
                              file
                                ? typeof file === "string"
                                  ? file
                                  : URL.createObjectURL(file)
                                : "https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143__340.png"
                            }
                            alt="Large version"
                            className="max-h-full w-full object-contain"
                          />
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

export default ImageModal;
