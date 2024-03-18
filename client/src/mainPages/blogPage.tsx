import React, { useState, useEffect } from "react";
import {
  fetchBlogsByUserId,
  createBlog,
  editBlog,
  deleteBlog,
} from "../request/index";
import { API_URL } from "../consts";
import { Author, Blog } from "../interfaces";
import useToken from "../hooks/useToken";

export default function BlogPage(): JSX.Element {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [newBlogInputText, setNewBlogInputText] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { userToken } = useToken();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch(`${API_URL}/authors`);
      if (!response.ok) {
        setError("Failed to fetch authors");
        return;
      }
      const authorsData: Author[] = await response.json();
      setAuthors(authorsData);
    } catch (error: any) {
      setError("Error fetching authors: " + error.message);
    }
  };

  const handlePost = async () => {
    if (!userToken?.token) {
      setError("No token provided");
      return;
    }
    try {
      const response = await createBlog(
        newBlogInputText,
        userToken?.token || ""
      );
      if (!response.isOk()) {
        setError("Failed to create blog");
        return;
      }
      const newBlog: Blog = response.value;
      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
      setNewBlogInputText("");
    } catch (error: any) {
      setError("Error posting blog: " + error.message);
    }
  };

  const handleEdit = async (blogId: string, newText: string) => {
    if (!userToken?.token) {
      setError("No token provided");
      return;
    }
    try {
      const response = await editBlog(blogId, newText, userToken?.token || "");
      if (!response.isOk()) {
        setError("Failed to edit blog");
        return;
      }
      const editedBlog: Blog = response.value;
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === editedBlog._id ? editedBlog : blog
        )
      );
    } catch (error: any) {
      setError("Error editing blog: " + error.message);
    }
  };

  const handleDelete = async (blogId: string) => {
    if (!userToken?.token) {
      setError("No token provided");
      return;
    }
    try {
      const response = await deleteBlog(blogId, userToken?.token || "");
      if (!response.isOk()) {
        setError("Failed to delete blog");
        return;
      }
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    } catch (error: any) {
      setError("Error deleting blog: " + error.message);
    }
  };

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Page</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <label className="block mb-2">Author:</label>
        <div className="flex flex-wrap">
          {filteredAuthors.map((author) => (
            <button
              key={author._id}
              onClick={() => setSelectedAuthor(author._id)}
              className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-2 mb-2 ${
                selectedAuthor === author._id ? "bg-blue-500 text-white" : ""
              }`}
            >
              {author.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Search Author:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search author"
          className="block w-full border border-gray-300 rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Blog Content:
          <textarea
            value={newBlogInputText}
            onChange={(e) => setNewBlogInputText(e.target.value)}
            className="block w-full border border-gray-300 rounded p-2"
            rows={4}
          />
        </label>
      </div>
      <button
        onClick={handlePost}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Post Blog
      </button>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Blogs:</h2>
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border border-gray-300 rounded p-4 mb-4"
          >
            <h3 className="text-xl font-bold mb-2">Author: {blog.userId}</h3>
            <p>{blog.text}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(blog._id, "New Text")} // Change "New Text" to desired new text
                className="bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
