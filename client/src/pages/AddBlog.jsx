import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { ImSpinner9 } from "react-icons/im";

const AddBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
    author: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://pantone-server.onrender.com/api/v1/blogs",
        formData
      );

      if (response.status === 201) {
        toast.success("Blog added successfully 😀👍");
        setFormData({
          title: "",
          body: "",
          category: "",
          author: "",
        });
      }
    } catch (err) {
      setError(
        err.response.data.message || err.response.data.error || err.message
      );
      toast.error(error || "Something went wrong 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cyan-300 h-svh flex justify-center items-center text-cyan-50">
      <form
        className="p-5 shadow-xl bg-cyan-700 rounded-md space-y-2 sm:w-1/2"
        onSubmit={handleSubmit}
      >
        <h2 className="font-tangerine text-5xl font-bold text-center">
          Add Blog
        </h2>
        <div>
          <label htmlFor="title" className="label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            className="w-full p-2 rounded-md text-gray-700"
          />
        </div>
        <div>
          <label htmlFor="body" className="label">
            Content:
          </label>
          <textarea
            id="body"
            name="body"
            onChange={handleChange}
            className="w-full p-2 rounded-md text-gray-700"
            rows="5"
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="label">
            Category:
          </label>
          <select id="category" className="w-full p-2 rounded-md text-gray-700"
          name="category"
          onChange={handleChange}
          >
            <option value="">--</option>
            <option value="tech">Tech</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="music">Music</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="author">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            onChange={handleChange}
            className="w-full p-2 rounded-md text-gray-700"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full font-bold p-2 rounded-md bg-cyan-500 mt-5 transition-all duration-300 grid place-content-center text-xl hover:text-gray-700 hover:bg-rose-500"
          >
            {loading ? (
              <ImSpinner9 className="text-2xl animate-spin" />
            ) : (
              "Add Blog"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
