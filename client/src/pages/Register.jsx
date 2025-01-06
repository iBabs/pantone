import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const porsonInfo = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(porsonInfo);
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4321/api/v1/auth/signup",
        formData
      );

      if (res.status === 201) {
      localStorage.setItem("pantone", JSON.stringify(res.data));
      console.log(res.data)
        toast.success("Registration successful 👍");
        history("/");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          error.response.data.error ||
          error.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h2 className="font-bold ">Register</h2>
      <p>
        Welcome to{" "}
        <span className="font-tangerine text-4xl text-cyan-500">Pantone</span>.
        Register now to enjoy the best gists and update
      </p>
      <form
        onSubmit={handleSubmit}
        className="sm:w-1/3 bg-cyan-500 text-gray-500 p-2 rounded"
      >
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            className="w-full p-2 rounded"
            placeholder="John"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            type="text"
            className="w-full p-2 rounded"
            placeholder="Deo"
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="w-full p-2 rounded"
            placeholder="johdedeo"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="w-full p-2 rounded"
            placeholder="example@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label" htmlFor="password">
            Password:
          </label>
          <div className="flex items-center border rounded outline-none p-2 w-full bg-white">
            <input
              type={show ? "text" : "password"}
              placeholder={show ? "Password@123" : "********"}
              className=" w-full outline-none"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="text-cyan-500"
            >
              {show ? <FaRegEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <div>
          <button className="w-full p-2 rounded bg-rose-500 text-cyan-500 mt-2 transition hover:bg-white hover:text-cyan-500">
            Register
          </button>
        </div>
      </form>
      <p className="text-xs text-center text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="text-cyan-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
