import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGITSER_URL = "/manageuser/changepassword";

const ChangePassword = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");

  const [newPwd, setNewPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setNewPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(newPwd);
    setValidPwd(result);
    const match = newPwd === matchPwd;
    setValidMatch(match);
  }, [newPwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, newPwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(newPwd);
    const match = newPwd === matchPwd;
    if (!v1 || !v2 || !match) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await axios.patch(REGITSER_URL, JSON.stringify({ user, pwd, newPwd }), {
        headers: { "Content-Type": "application/json" },
      });
      setSuccess(true);
      //clear input fields
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 404 || err.response?.status === 401) {
        setErrMsg("Username or Password is wrong");
      } else {
        setErrMsg("Password Update Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
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
              <span className="font-medium">Password Reset Successfull!</span>
            </div>
            <p className="mt-2 text-sm">
              Congratulations! You have successfully changed your password.
            </p>
            <div className="flex justify-center">
              <Link
                to="/login"
                className="mt-4 text-gray-400 hover:text-gray-300 text-sm underline"
              >
                Go to home page
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex flex-col flex-wrap content-center justify-center w-full h-screen">
          <form
            onSubmit={handleSubmit}
            className={`bg-secondary-dark-bg h-fit xl:w-1/4 lg:w-1/2 md:w-4/6 w-11/12 mt-12 rounded-2xl pr-4 pl-4 pt-6 pb-6 text-white `}
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
                Change Password
              </h1>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-bold mb-2"
                >
                  Username:
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
                  htmlFor="password"
                  className="block text-sm font-bold mb-2"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-describedby="pwdnote"
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-bold mb-2"
                >
                  New Password:
                  <span className={validPwd ? "text-green-600 ml-1" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validPwd || !newPwd ? "hidden" : "text-red-600 ml-1"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="newPassword"
                  onChange={(e) => setNewPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setNewPwdFocus(true)}
                  onBlur={() => setNewPwdFocus(false)}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd
                      ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                      : "hidden"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters. <br /> Must include uppercase and
                  lowercase letters, a number and a special characters:{" "}
                  <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hashtag">#</span>
                  <span aria-label="percent">%</span>
                </p>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirm_pwd"
                  className="block text-sm font-bold mb-2"
                >
                  Confirm Password:
                  <span
                    className={
                      validMatch && matchPwd ? "text-green-600 ml-1" : "hidden"
                    }
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validMatch || !matchPwd ? "hidden" : "text-red-600 ml-1"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validPwd
                      ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                      : "absolute -left-full"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must Match the first password input field.
                </p>
              </div>
              <div className="text-center mb-6">
                <button
                  disabled={
                    !validName || !validPwd || !validMatch || !pwd
                      ? true
                      : false
                  }
                  className={`${
                    !validName || !validPwd || !validMatch || !pwd
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

export default ChangePassword;
