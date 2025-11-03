/**
 * @file Renders a preview section of the latest blog posts for the home page.
 * It fetches posts from Firebase and displays them with animations.
 */

import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../Firebase";
import Loader from "../../../../components/loader/Loader";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * A component that displays a preview of the first 4 blog posts.
 * @returns {JSX.Element} The rendered blog preview section.
 */
const BlogPreview = () => {
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

  // Animation variants for the main container of the posts grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  // Animation variants for each individual post card
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="py-20">
      <div className="mx-auto w-[80%]">
        <div className="justify-center flex gap-2 text-2xl font-medium py-8"> <p>From the</p> <p className="text-orange-500"> Blog</p> </div>
        {/* Display a loader while posts are being fetched */}
        {isLoading ? (
          <Loader />
        ) : (
          // Animated grid container for the blog posts
          <motion.section
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
            variants={containerVariants}
          >
            {/* Map over the first 4 posts and render a card for each */}
            {posts.slice(0, 4).map((post) => (
              // Each card is a link to the full post page. The key is placed here.
              <Link to={`/post/${post.id}`} key={post.id}>
                <div className="flex mb-12 flex-col h-80">
                  {/* Animated div for each card with hover effects */}
                  <motion.div
                    className="transform transition-transform duration-500 hover:scale-102 ease-in cursor-pointer"
                    variants={itemVariants}
                  >
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
                    {/* Post title, which is also a link */}
                    <h2 className="py-4 font-medium pl-2 text-black text-xl">
                      <span className="hover:text-orange-500 duration-300 ease-in-out">
                        {post.title.slice(0, 20) + "..."}
                      </span>
                    </h2>
                    {/* Display a truncated preview of the post content */}
                    <p className="pl-2 text-sm pb-8 text-gray-700">
                      {getPreviewText(post.content, 150)}
                    </p>
                  </motion.div>
                </div>
              </Link>
            ))}
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default BlogPreview;
