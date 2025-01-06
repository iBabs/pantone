import { Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/RootLayout";
import DashBoard from "./pages/DashBoard";
import Blogs from "./pages/Blogs";
import AddBlog from "./pages/AddBlog";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route index element={<DashBoard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:_id" element={<BlogDetails />} />
          {/* just added 👇 */}
          <Route path="/blogs/:_id/edit" element={<EditBlog />} />
          <Route path="/add-blog" element={<AddBlog />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
