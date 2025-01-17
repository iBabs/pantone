import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const { _id } = useParams();
  const history = useNavigate();

  const deleteBlog = async () => {
    try {
      const sure = confirm("Are you sure you want to delete this blog?");
      if(sure){
      const response = await axios.delete(`https://pantone-server.onrender.com/api/v1/blogs/${_id}`);
      if(response.status === 200){
        toast.success("Blog deleted successfully 🚮")
        history("/blogs")
    } }
    } catch (error) {
      console.log(error)
      toast.error("Error deleting blog ❌")
    }
  }



  const blog = useFetch(`https://pantone-server.onrender.com/api/v1/blogs/${_id}`);

  console.log(blog);
  const { loading, data, error } = blog;

  if (loading) {
    return (
      <div className="text-7xl font-bold text-rose-500 font-tangerine grid place-content-center h-screen">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-7xl font-bold text-red-500 font-tangerine grid place-content-center h-screen">
        {" "}
        ⚠️ An error occured
      </div>
    );
  }
  return (
    <div className="min-h-screen p-10 relative">
        <button 
        onClick={() => history("/blogs")}
        className="italic text-cyan-800 underline text-sm">Go back</button>

      {data?.blog && (
        <div className="">
          <h1 className="font-bold uppercase text-2xl text-center">
            {data.blog.title}
          </h1>
          <p className="p-5 bg-slate-300 text-cyan-900 rounded-md my-5">{data.blog.body}</p>
          <p className="font-mono capitalize text-gray-700 my-2">🐛 {data.blog.category}</p>
          <p className="font-tangerine font-bold uppercase text-cyan-700 my-4">{data.blog.author}</p>
          <div className="flex justify-between flex-col sm:flex-row items-center">
            <p>
              <span className="font-bold font-mono text-cyan-700 underline">Created:</span>
              {new Date(data.blog.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-bold font-mono text-cyan-700 underline">Updated:</span>
              {new Date(data.blog.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center space-x-5">
          <Link 
          to={`/blogs/${_id}/edit`}
          className="py-3 px-5 rounded-md text-cyan-950 bg-yellow-500 transition hover:opacity-80 font-mono">Update Blog</Link>
          <button 
          onClick={deleteBlog}
          className="py-3 px-5 rounded-md text-white bg-red-500 transition hover:opacity-80 font-mono">Delete Blog</button>
      </div>
    </div>
  );
};

export default BlogDetails;
