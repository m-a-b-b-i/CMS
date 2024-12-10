import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useContent from "../hooks/useContent";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

const LOGIN_URL = "/auth";
const Login = () => {
  const { setAuth } = useContent();

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttributes] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ user, accessToken });
      resetUser();
      setPwd("");
      navigate("/edit", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="flex flex-col flex-wrap content-center justify-center w-full h-screen">
      <form
        onSubmit={handleSubmit}
        className={`bg-secondary-dark-bg h-fit xl:w-1/4 lg:w-1/2 md:w-4/6 w-11/12 mt-12 rounded-2xl pr-4 pl-4 pt-6 pb-6 text-white`}
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
          <h1 className="text-3xl font-bold mb-4 text-center">Welcome Back!</h1>
          <h6 className=" text-sm font-medium text-slate-500 text-center mb-4">
            Login to Continue
          </h6>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              {...userAttributes}
              className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
              required
            />
          </div>
          <div className="text-center mb-6">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-52 rounded focus:outline-none focus:shadow-outline">
              Sign In
            </button>
          </div>
          <div className="mb-6">
            <input
              type="checkbox"
              id="persist"
              onChange={toggleCheck}
              checked={check}
              className="ml-2 leading-tight"
            />
            <label htmlFor="persist" className="ml-2 text-sm font-bold mb-2">
              Trust This Device
            </label>
          </div>
          <p>
            Need an Account?
            <span className="line ml-2 text-slate-400">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
