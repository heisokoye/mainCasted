/**
 * @file Renders the main blog page, fetching and displaying a list of blog posts from Firebase.
 */

import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

/**
 * Blog component that fetches and displays blog posts.
 * @returns {JSX.Element} The rendered blog page.
 */
const Blog = () => {
  // State to store the list of blog posts
  const [posts, setPosts] = useState([]);
  // State to manage the loading status while fetching posts
  const [isLoading, setIsLoading] = useState(false);

  /**
   * useEffect hook to fetch posts from Firestore in real-time.
   * It sets up a listener that updates the posts state whenever the 'posts' collection changes.
   * The listener is cleaned up when the component unmounts.
   */
  useEffect(() => {
    setIsLoading(true);
    // Subscribe to real-time updates from the 'posts' collection in Firestore
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      // Map the documents to an array of post objects, including the document ID
      const postsList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postsList);
      setIsLoading(false);
    });
    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  /**
   * Helper function to create a plain text preview from HTML content.
   * It strips HTML tags and truncates the text to a specified limit.
   * @param {string} html - The HTML content string.
   * @param {number} [limit=150] - The character limit for the preview text.
   * @returns {string} The truncated plain text preview.
   */
  const getPreviewText = (html, limit = 150) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  // className="bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed
  return (
    <div className="py-20 bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed  lg:h-screen md:h-screen">
      {/* Main container for the blog posts grid */}
      <div className="mx-auto w-[80%]">
        {/* Display a loader while posts are being fetched */}
        {isLoading ? (
          <Loader />
        ) : (
          // Grid layout for the blog posts
          <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {/* Map over the first 4 posts and render a card for each */}
            {posts.slice(0, 4).map((post) => (
              <Link to={`/post/${post.id}`} key={post.id}>
                <div className="flex mb-12 flex-col h-80">
                  {/* Post content */}
                  <div>
                    <img
                      src={post.fileUrl}
                      alt={post.title}
                      className="w-full h-50 object-cover rounded-2xl mb-2"
                    />
                    <p className="font-medium text-sm text-gray-600 pl-2">
                      {/* Format and display the post creation date */}
                      {post.createdAt?.toDate().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="py-4 font-medium pl-2 text-black text-xl">
                      {/* Display a truncated post title */}
                      {post.title.slice(0, 20) + ""}
                    </h2>
                    <p className="pl-2 text-sm text-gray-700">
                      {/* Display a truncated preview of the post content */}
                      {getPreviewText(post.content, 150)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
