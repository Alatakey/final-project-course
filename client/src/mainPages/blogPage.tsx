import React, { useState } from "react";

interface Blog {
  content: string;
  author: string;
}

export default function BlogPage(): JSX.Element {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [newBlog, setNewBlog] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const authors = ["Author 1", "Author 2", "Author 3"]; // Mock list of authors

  const handlePost = (): void => {
    const blog: Blog = { content: newBlog, author: selectedAuthor };
    setBlogs((prevBlogs) => [...prevBlogs, blog]);
    setNewBlog("");
    setSelectedAuthor("");
  };

  const filteredAuthors = authors.filter((author) =>
    author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Page</h1>
      <div className="mb-4">
        <label className="block mb-2">Author:</label>
        <div className="flex flex-wrap">
          {filteredAuthors.map((author, index) => (
            <button
              key={index}
              onClick={() => setSelectedAuthor(author)}
              className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-2 mb-2 ${
                selectedAuthor === author ? "bg-blue-500 text-white" : ""
              }`}
            >
              {author}
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
            value={newBlog}
            onChange={(e) => setNewBlog(e.target.value)}
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
        {blogs.map((blog, index) => (
          <div key={index} className="border border-gray-300 rounded p-4 mb-4">
            <h3 className="text-xl font-bold mb-2">Author: {blog.author}</h3>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
