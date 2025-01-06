import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaRegEye, FaEyeSlash  } from "react-icons/fa";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from '../context/AppContext';

const Login = () => {
const [show, setShow] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const history = useNavigate();


const {dispatch} = useContext(AppContext)

const  handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const response = await axios.post("http://localhost:4321/api/v1/auth/login", {email, password});
    if (response.status === 200) {
      localStorage.setItem("pantone", JSON.stringify(response.data));
      dispatch({type: "LOGIN", payload: response.data})
      toast.success("Login successful 👍");
      history("/");
    }
  } catch (error) {
    console.log(error)
    toast.error(
      error.response.data.message ||
        error.response.data.error ||
        error.message
    );
  }finally{
    setLoading(false);
  
  }
}



  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h2>LOGIN</h2>
      <p className="text-center text-2xl font-bold ">
        Welcome to Pantone. Please login to continue
      </p>
      <form className="max-w-xs shadow-lg rounded p-5 space-y-3"
      onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded outline-none p-2 w-full border-cyan-300"
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password:
          </label>
          <div className="flex items-center border rounded outline-none p-2 w-full border-cyan-300">
          <input
            type={show?"text":"password"}
            placeholder={show?"Password@123":"********"}
            className=" w-full outline-none"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button"
          onClick={() => setShow(!show)}
          >{show? <FaRegEye/>: <FaEyeSlash/>}</button>
          </div>
        </div>
        <div>
          <button className="rounded py-2 px-4 bg-cyan-500 w-full transition hover:bg-rose-500 hover:text-white"
          type="submit"
          disabled={loading}
          
          >
           { loading?"Logging in...":"Login"}
          </button>
        </div>
      </form>
      <p className="text-xs text-center text-slate-600">
        Don&rsquo;t have an account? Register <Link to="/register" className="underline">here</Link>{" "}
      </p>
    </div>
  );
};

export default Login;
