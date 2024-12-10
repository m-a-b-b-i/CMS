import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import Loading from "../components/Loading";
import ImageModal from "../components/modals/ImageModal";
import useContent from "../hooks/useContent";
import jwtDecode from "jwt-decode";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[a-zA-Z ]+$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
const NUMBER_REGEX = /^[0-9]{10}$/;
const ADDRESS_REGEX = /^[a-zA-Z0-9.,#\-/\s]*$/;

const EditProfile = () => {
  const userRef = useRef();
  const errRef = useRef();

  const { auth } = useContent();
  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const id = decoded?.UserInfo?.id || "";
  const axiosPrivate = useAxiosPrivate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [name, setName] = useState("");
  const [validOgName, setValidOgName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [number, setNumber] = useState("");
  const [validNumber, setValidNumber] = useState(false);
  const [numberFocus, setNumberFocus] = useState(false);

  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [addressFocus, setAddressFocus] = useState(false);

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidOgName(result);
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = NUMBER_REGEX.test(number);
    setValidNumber(result);
  }, [number]);

  useEffect(() => {
    const result = ADDRESS_REGEX.test(address);
    setValidAddress(result);
  }, [address]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, number, address, file]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`manageuser/${id}`, {
          signal: controller.signal,
        });

        isMounted && setUser(response.data.username);
        isMounted && setName(response.data.name);
        isMounted && setEmail(response.data.email);
        isMounted && setNumber(response.data.phonenumber);
        isMounted && setAddress(response.data.address);
        isMounted && setFile(response.data.imageUrl);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = NUMBER_REGEX.test(number);
    const v4 = ADDRESS_REGEX.test(address);
    const v5 = NAME_REGEX.test(name);

    if (!v1 || !v2 || !v3 || !v4 || !v5 || !file) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const form = new FormData();
      form.append("user", user);
      form.append("name", name);
      form.append("phonenumber", number);
      form.append("email", email);
      form.append("address", address);
      form.append("file", file);

      setLoading(true);

      await axios.put(`/manageuser/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
      setLoading(false);
      //clear input fields
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
        setUser("");
      } else {
        setErrMsg("Form Submission Failed");
      }
      setLoading(false);
      errRef.current.focus();
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : success ? (
        <section className="flex flex-col flex-wrap content-center justify-center w-full h-screen">
          <div className="bg-gray-800 rounded-md p-4 text-green-500">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-medium">Profile updated successfully</span>
            </div>

            <div className="flex justify-center">
              <Link
                to="/profile"
                className="mt-4 text-gray-400 hover:text-gray-300 text-sm underline"
              >
                Go to Profile
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex flex-col flex-wrap content-center justify-center w-full ">
          <form
            onSubmit={handleSubmit}
            className={`bg-secondary-dark-bg h-fit w-11/12 rounded-2xl pr-4 pl-4 pt-6 pb-6 text-white`}
          >
            <p
              ref={errRef}
              className={
                errMsg
                  ? "bg-pink-400 text-red-600 rounded-lg p-2 mb-2 font-bold"
                  : "absolute -left-full"
              }
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="mx-5">
              <h1 className="text-3xl font-bold mb-4 text-center">
                Edit Profile
              </h1>
              <div className="grid sm:grid-cols-2 gap-x-16">
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block text-sm font-bold mb-2"
                  >
                    Username:{" "}
                    {!user ? (
                      <span className="text-red-600 mr-2">*</span>
                    ) : null}
                    <span
                      className={validName ? "text-green-600 ml-1" : "hidden"}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        validName || !user ? "hidden" : "text-red-600 ml-1"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={user}
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                  />
                  <p
                    id="uidnote"
                    className={
                      userFocus && user && !validName
                        ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                        : "hidden"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters. <br /> Must begin with a letter. <br />{" "}
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold mb-2"
                  >
                    Name:{" "}
                    {!name ? (
                      <span className="text-red-600 mr-2">*</span>
                    ) : null}
                    <span
                      className={validOgName ? "text-green-600 ml-1" : "hidden"}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        validOgName || !name ? "hidden" : "text-red-600 ml-1"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    required
                    aria-invalid={validOgName ? "false" : "true"}
                    aria-describedby="namenote"
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                    className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                  />
                  <p
                    id="namenote"
                    className={
                      nameFocus && name && !validOgName
                        ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                        : "hidden"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please enter a valid name with only letters and spaces,
                    without any numbers or special characters.
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-16">
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold mb-2"
                  >
                    Email:{" "}
                    {!email ? (
                      <span className="text-red-600 mr-2">*</span>
                    ) : null}
                    <span
                      className={validEmail ? "text-green-600 ml-1" : "hidden"}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        validEmail || !email ? "hidden" : "text-red-600 ml-1"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                  />
                  <p
                    id="emailnote"
                    className={
                      emailFocus && email && !validEmail
                        ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                        : "hidden"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {/*write message for invalid email */}
                    Please enter a valid email address.
                  </p>
                </div>
                <div className="mb-6">
                  <label htmlFor="tel" className="block text-sm font-bold mb-2">
                    Phone Number:{" "}
                    {!number ? (
                      <span className="text-red-600 mr-2">*</span>
                    ) : null}
                    <span
                      className={validNumber ? "text-green-600 ml-1" : "hidden"}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        validNumber || !number ? "hidden" : "text-red-600 ml-1"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    autoComplete="off"
                    required
                    aria-invalid={validNumber ? "false" : "true"}
                    aria-describedby="telnote"
                    onFocus={() => setNumberFocus(true)}
                    onBlur={() => setNumberFocus(false)}
                    className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                  />
                  <p
                    id="telnote"
                    className={
                      numberFocus && number && !validNumber
                        ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                        : "hidden"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {/*write message for invalid number */}
                    Please enter a valid phone number.
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-bold mb-2"
                >
                  Address:
                  <span
                    className={validAddress ? "text-green-600 ml-1" : "hidden"}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validAddress || !address ? "hidden" : "text-red-600 ml-1"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <textarea
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="off"
                  required
                  aria-invalid={validAddress ? "false" : "true"}
                  aria-describedby="addressnote"
                  onFocus={() => setAddressFocus(true)}
                  onBlur={() => setAddressFocus(false)}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                />
                <p
                  id="addressnote"
                  className={
                    addressFocus && address && !validAddress
                      ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                      : "hidden"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {/*write message for invalid address */}
                  Please enter a valid address.
                </p>
              </div>
              <div className="mb-4 flex items-center space-x-6 justify-center">
                <ImageModal file={file} />
                <br />
                <div className="flex justify-center">
                  <label className="block">
                    <span className="sr-only">Choose File</span>
                    <input
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      id="file"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      aria-describedby="filenote"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              <div className="text-center mb-6">
                <button
                  disabled={
                    !validName ||
                    !validOgName ||
                    !validEmail ||
                    !validNumber ||
                    !file
                      ? true
                      : false
                  }
                  className={`${
                    !validName ||
                    !validOgName ||
                    !validEmail ||
                    !validNumber ||
                    !file
                      ? "bg-blue-300"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white font-bold py-2 w-52 rounded focus:outline-none focus:shadow-outline`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default EditProfile;
