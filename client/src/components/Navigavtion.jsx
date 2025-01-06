import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { GrHome } from "react-icons/gr";
import { SiMicrodotblog } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Navigation = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AppContext);

  function logout() {
    const leave = window.confirm("Are you sure you want to leave?");
    if (leave) {
      localStorage.removeItem("pantone");
      dispatch({
        type: "LOGOUT",
      });
      toast.info("You have been logged out 👍");
    }
  }

  return (
    <header className="bg-zinc-950">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link to="/" className="block text-teal-600">
              <img src={logo} alt="logo" width={50} />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <NavLink
                    className="text-cyan-500 transition relative hover:text-cyan-500/75 group text-center grid place-items-center"
                    to="/"
                  >
                    <GrHome className="size-6" />
                    <span className="text-cyan-500 opacity-0 bg-transparent text-xs transition-all duration-300 ease-linear absolute -bottom-3 group-hover:opacity-100 group-hover:static ">
                      Home
                    </span>
                  </NavLink>
                </li>
                {user && (
                  <>
                    <li>
                      <NavLink
                        className="text-cyan-500 relative group transition  grid place-items-center hover:text-cyan-500/75"
                        to="/blogs"
                      >
                        <SiMicrodotblog className="size-6" />
                        <span className="text-cyan-500 opacity-0 bg-transparent text-xs transition-all duration-300 ease-linear absolute -bottom-3 group-hover:opacity-100 group-hover:static ">
                          Blogs
                        </span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        className="text-cyan-500 relative group transition  grid place-items-center hover:text-cyan-500/75"
                        to="/category"
                      >
                        <BiCategory className="size-6" />
                        <span className="text-cyan-500 opacity-0 bg-transparent text-xs transition-all duration-300 ease-linear absolute -bottom-3 group-hover:opacity-100 group-hover:static ">
                          Category
                        </span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        className="text-cyan-500 transition relative group  grid place-items-center hover:text-cyan-500/75"
                        to="/profile"
                      >
                        <FaRegUser className="size-6" />
                        <span className="text-cyan-500 opacity-0 bg-transparent text-xs transition-all duration-300 ease-linear absolute -bottom-3 group-hover:opacity-100 group-hover:static ">
                          Profile
                        </span>
                      </NavLink>
                    </li>
                  </>
                )}
                <li>
                  <NavLink
                    className="text-cyan-500 transition relative group  grid place-items-center hover:text-cyan-500/75"
                    to="/about"
                  >
                    <BsInfoCircle className="size-6" />
                    <span className="text-cyan-500 opacity-0 bg-transparent text-xs transition-all duration-300 ease-linear absolute -bottom-3 group-hover:opacity-100 group-hover:static ">
                      About
                    </span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="text-cyan-300 flex gap-2 items-center">
                <p>Hello, {user.author.username}</p>

                <button
                  onClick={logout}
                  className="p-2 border-2 border-cyan-300 rounded"
                >
                  LOG OUT
                </button>
              </div>
            )}

            {!user && (
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  to="/login"
                >
                  Login
                </Link>

                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-cyan-100 px-5 py-2.5 text-sm font-medium text-cyan-600"
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}

            <div className="block md:hidden">
              <button className="rounded bg-cyan-100 p-2 text-cyan-600 transition hover:text-cyan-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
