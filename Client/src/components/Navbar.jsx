import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo2 from "../data/logo-3.png";
import useContent from "../hooks/useContent";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const {
    auth,
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    pageName,
  } = useContent();

  const navigate = useNavigate();
  const logout = useLogout();
  const signout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);
  useEffect(() => {
    if (screenSize <= 1000) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);
  return !activeMenu ? (
    <div className="flex justify-between text-white pt-4 pb-4 sm:pt-10 pl-5 pr-5 sm:pb-5 md:ml-6 md:mr-6 relative">
      {screenSize <= 1000 && !activeMenu ? (
        <img src={logo2} alt="" width="50" height="50" />
      ) : (
        <h1 className="text-2xl capitalize">{pageName}</h1>
      )}

      {auth?.accessToken ? (
        <>
          <>
            <button
              className={`bg-blue-600 text-white rounded-xl hover:bg-blue-800  mr-8 ml-8  relative ${
                screenSize > 1000 ? "w-36 pt-3 pb-3" : "w-full"
              }`}
              onClick={signout}
            >
              Log Out
            </button>
          </>
        </>
      ) : (
        <button
          className={`bg-blue-600 text-white rounded-xl hover:bg-blue-800  mr-8 ml-8  relative ${
            screenSize > 1000 ? "w-36 pt-3 pb-3" : "w-full"
          }`}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}

      <button
        onClick={() =>
          setActiveMenu((prev) => {
            return !prev;
          })
        }
      >
        <span className="absolute inline-flex rounded-full h-5 w-5 right-2" />
        <AiOutlineMenu size={35} />
      </button>
    </div>
  ) : (
    screenSize >= 1000 && (
      <>
        <div className="flex justify-between w-full text-white pt-4 pb-4 sm:pt-10 pl-5 pr-5 sm:pb-5 md:ml-6 md:mr-6 relative">
          <h1 className="text-2xl capitalize">{pageName}</h1>

          {auth?.accessToken ? (
            <>
              <button
                className={`bg-blue-600 text-white rounded-xl hover:bg-blue-800  mr-8 ml-8  relative ${
                  screenSize > 1000 ? "w-36 pt-3 pb-3" : "w-full"
                }`}
                onClick={signout}
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              className={`bg-blue-600 text-white rounded-xl hover:bg-blue-800  mr-8 ml-8  relative ${
                screenSize > 1000 ? "w-36 pt-3 pb-3" : "w-full"
              }`}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </>
    )
  );
};

export default Navbar;
