import { Link, NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { AiOutlineClose } from "react-icons/ai";
import { links } from "../data/dummy";
import logo from "../data/logo-3.png";
import useContent from "../hooks/useContent";

export default function Sidebar() {
  const { auth, activeMenu, setActiveMenu, screenSize, setPageName } =
    useContent();
  const activeLink =
    "flex item-center gap-5 pl-4 pt-3 pb-2.5 rounded-md text-white bg-active-link-bg text-md border-l-4 border-blue-700 mt-2 mb-2";
  const normalLink =
    "flex item-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-200 hover:bg-active-link-bg mt-2 mb-2";

  const handleCloseSideBar = (title) => {
    if (activeMenu && screenSize <= 1000) {
      setActiveMenu((prev) => {
        return !prev;
      });
    }
    if (typeof title === "string") {
      setPageName(title);
    }
  };

  const filterNav = () => {
    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const roles = decoded?.UserInfo?.roles || [];

    let nav = links.filter((ele) => {
      if (auth?.accessToken) {
        if (roles?.find((role) => ele.roles.includes(role))) {
          return true;
        } else {
          return false;
        }
      } else {
        if (!ele.isProtected) {
          return true;
        } else {
          return false;
        }
      }
    });
    return nav;
  };
  return (
    <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 z-50 relative">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-white text-slate-1000"
            >
              <img src={logo} alt="" className=" h-20 sm:ml-10 ml-2" />
            </Link>
            {/* <ReactTooltip place="bottom" id="close" effect="solid">
              Close
            </ReactTooltip> */}
            <button
              type="button"
              onClick={handleCloseSideBar}
              className={`text-xl rounded-full p-3 hover:bg-slate-600 mt-4 text-white ${
                screenSize > 1000 ? "hidden" : "block"
              }`}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="mt-10">
            {filterNav().map((items) => (
              <NavLink
                to={`/${items.link}`}
                key={items.title}
                onClick={() => handleCloseSideBar(items.title)}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {items.icon}
                <span className="capitalize">{items.title}</span>
              </NavLink>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
