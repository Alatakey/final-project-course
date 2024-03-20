import React, { useState, useEffect } from "react";
import {
  fetchBlogsByUserId,
  createBlog,
  editBlog,
  deleteBlog,
  fetchAuthorsWithBlogs,
} from "../request/index";
import { API_URL } from "../consts";
import { Blog, UserResponse } from "../interfaces";
import useToken from "../hooks/useToken";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

export default function BlogPage(): JSX.Element {
  const [newBlogInputText, setNewBlogInputText] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<
    UserResponse | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { userToken } = useToken();
  const [error, setError] = useState<string>("");

  const {
    data: selectedAuthorBlogs = [],
    refetch: refetchSelectedAuthorBlogs,
  } = useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    queryKey: ["selectedAuthorBlogs", selectedAuthor?._id],
    queryFn: async (): Promise<Blog[]> => {
      if (!selectedAuthor) {
        return [];
      }
      const res = await fetchBlogsByUserId(selectedAuthor._id);
      if (!res.isOk()) {
        setError("Failed to fetch authors");
        return [];
      }
      return res.value;
    },
  });

  const { data: authorsWithBlogs = [], refetch: refetchAuthors } = useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    queryKey: ["authorsWithBlogs"],
    queryFn: async (): Promise<UserResponse[]> => {
      const res = await fetchAuthorsWithBlogs();
      if (!res.isOk()) {
        setError("Failed to fetch authors");
        return [];
      }
      return res.value;
    },
  });

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
      refetchSelectedAuthorBlogs();
      setSelectedAuthor(userToken.user);
      refetchAuthors();
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
      refetchSelectedAuthorBlogs();
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
      refetchSelectedAuthorBlogs();
      refetchAuthors();
    } catch (error: any) {
      setError("Error deleting blog: " + error.message);
    }
  };

  const filteredAuthors = authorsWithBlogs.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Page</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

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
      <h1 className="text-2xl font-bold mb-4">App author Blogs:</h1>
      <div className="mb-4">
        <label className="block mb-2">Search Author:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search author"
          className="block w-full border border-gray-300 rounded p-2 mb-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Author:</label>
        <div className="flex flex-wrap">
          {filteredAuthors.map((author) => (
            <button
              key={author._id}
              onClick={() => setSelectedAuthor(author)}
              className={clsx(
                "bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-2 mb-2",
                {
                  "bg-blue-500 text-green-500":
                    selectedAuthor?._id === author._id,
                }
              )}
            >
              {author.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handlePost}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Post Blog
      </button>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Blogs:</h2>
        {selectedAuthorBlogs.map((blog) => {
          return (
            <BlogPost
              key={blog._id}
              blog={blog}
              isMyBlog={blog.userId === userToken?.user._id}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              author={selectedAuthor}
            />
          );
        })}
      </div>
    </div>
  );
}

interface BlogPostProps {
  blog: Blog;
  author: UserResponse | undefined;
  handleEdit: (blogId: string, newText: string) => void;
  handleDelete: (blogId: string) => void;
  isMyBlog: boolean;
}
function BlogPost({
  blog,
  handleEdit,
  handleDelete,
  author,
  isMyBlog,
}: BlogPostProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(blog.text);

  const handleSaveEdit = () => {
    handleEdit(blog._id, editedText);
    setIsEditing(false);
  };

  return (
    <div key={blog._id} className="border border-gray-300 rounded p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">
        Author: {author?.name || blog._id}
      </h3>
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2 mb-2"
          rows={4}
        />
      ) : (
        <p>{blog.text}</p>
      )}
      <div className="mt-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className={clsx(
              "bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-600",
              { hidden: !isMyBlog }
            )}
          >
            Edit
          </button>
        )}
        <button
          onClick={() => handleDelete(blog._id)}
          className={clsx(
            "bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600",
            { hidden: !isMyBlog }
          )}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
