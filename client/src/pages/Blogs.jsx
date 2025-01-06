import useFetch from "../hooks/useFetch";
import { FaEye, FaPen } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blog = useFetch("http://localhost:4321/api/v1/blogs");

  console.log(blog);

  const { loading, data, error } = blog;

  return (
    <>
      <h1 className="text-center font-tangerine text-rose-500 text-3xl sm:text-5xl my-5 font-bold">
        Blogs
      </h1>
      <div className="min-h-screen flex flex-col px-5 sm:px-10 gap-5 ">
        {loading && (
          <h1 className="font-bold animate-pulse text-cyan-800 m-auto text-5xl">
            Loading...
          </h1>
        )}
        {error && (
          <h1 className="font-bold animate-pulse text-red-800 m-auto text-5xl">
            {error}
          </h1>
        )}

        {data &&
          data.blogs.map((blog) => (
            <div
              key={blog._id}
              className="relative group flex flex-col gap-2 rounded shadow-md p-5 transition hover:shadow-xl"
            >
              <h1 className="font-bold text-rose-500 text-2xl">{blog.title}</h1>
              <p className="text-gray-500">{blog.body.slice(0, 200)}</p>
              <div className="w-full flex justify-between">
                <p className="font-mono font-bold uppercase text-cyan-700">
                  {blog.author}
                </p>
                <p>{new Date(blog.createdAt).toLocaleString()}</p>
              </div>
              <div className="sm:hidden absolute  md:group-hover:flex gap-5 justify-end right-1 top-1 p-5 ">
                <Link
                  to={`/blogs/${blog._id}`}
                  className="transition-all duration-150 hover:text-cyan-700"
                >
                  <FaEye className="text-rose-500 text-2xl transition-all duration-150 hover:text-cyan-700" />
                </Link>
                <Link
                to={`/blogs/${blog._id}/edit`}
                className="transition-all duration-150 hover:text-cyan-700 text-rose-500 text-2xl">
                  <FaPen />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Blogs;
