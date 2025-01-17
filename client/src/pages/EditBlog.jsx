import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import { useParams } from "react-router-dom";



function EditBlog() {
    const {_id} = useParams()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
      title: "",
      body: "",
      category: "",
      author: "",
    });
    const navigate = useNavigate();

    useEffect(()=>{
      const fetchBlog = async () => {
        try {
          const response = await axios.get(
            `https://pantone-server.onrender.com/api/v1/blogs/${_id}`
          );
          // console.log(response.data)
          setFormData(response.data.blog)
          
        } catch (err) {
          console.log(err)
        }
      };
      fetchBlog()
    },[_id])

  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
        setError(null);
  
        const response = await axios.patch(
          `https://pantone-server.onrender.com/api/v1/blogs/${_id}`,
          formData
        );
  
        if (response.status === 200) {
          toast.success("Blog Updated successfully 😀👍");
          setFormData({
            title: "",
            body: "",
            category: "",
            author: "",
          });
          navigate("/blogs");
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
    <div className="flex items-center justify-center h-dvh">
         <form
        className="p-5 shadow-xl  rounded-md space-y-2 sm:w-1/2"
        onSubmit={handleSubmit}
      >
        <h2 className="font-tangerine text-5xl font-bold text-center">
          Update Blog
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
            value={formData.title}
            className="w-full p-2 bg-slate-100 rounded-md text-gray-700"
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
            value={formData.body}
            className="w-full p-2 bg-slate-100 rounded-md text-gray-700"
            rows="5"
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="label">
            Category:
          </label>
          <select id="category" className="w-full p-2 bg-slate-100 rounded-md text-gray-700"
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
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 bg-slate-100 rounded-md text-gray-700"
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
              "Update Blog"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditBlog