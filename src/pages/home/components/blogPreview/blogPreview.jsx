/**
 * @file Renders a preview section of the latest blog posts for the home page.
 * It fetches posts from Firebase and displays them with animations.
 */
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../../../Firebase";
import Loader from "../../../../components/loader/Loader";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";  // Importing heart icons for like button

/**
 * A component that displays a card for a single blog post.
 * It includes a like button with state management that is persistent
 * across reloads using localStorage and syncs with Firebase.
 * @param {{post: object}} props - The post object to display.
 * @returns {JSX.Element} The rendered post card.
 */
const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);  // State to track if the post is liked
  const [likeCount, setLikeCount] = useState(post.likes || 0);  // State to track the number of likes

  // Effect to check localStorage on mount to see if the post is liked
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    if (likedPosts.includes(post.id)) {
      setIsLiked(true);
    }
  }, [post.id]);

  // Effect to update like count when the prop changes from Firestore
  useEffect(() => {
    setLikeCount(post.likes || 0);
  }, [post.likes]);

  // Handler for like button click
  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || []; // Get liked posts from localStorage
    const isCurrentlyLiked = likedPosts.includes(post.id); // Check if the post is currently liked

    // Optimistically update the UI
    setIsLiked(!isCurrentlyLiked);
    setLikeCount(prevCount => isCurrentlyLiked ? prevCount - 1 : prevCount + 1);

    // Update localStorage
    const newLikedPosts = isCurrentlyLiked
      ? likedPosts.filter(id => id !== post.id)
      : [...likedPosts, post.id];
    localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));

    // Asynchronously update Firestore
    const postRef = doc(db, 'posts', post.id);
    try {
      await updateDoc(postRef, {
        likes: increment(isCurrentlyLiked ? -1 : 1)
      });
    } catch (error) {
      console.error("Error updating like count in Firebase: ", error);
      // If Firebase update fails, revert the optimistic UI update
      setIsLiked(isCurrentlyLiked);
      setLikeCount(prevCount => isCurrentlyLiked ? prevCount + 1 : prevCount - 1);
      // Revert localStorage
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
  };

  /**
   * Helper function to create a plain text preview from HTML content.
   * @param {string} html - The HTML content string.
   * @param {number} [limit=150] - The character limit for the preview text.
   * @returns {string} The truncated plain text preview.
   */
  const getPreviewText = (html, limit = 150) => {
    if (!html) return "";
    const text = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <Link to={`/post/${post.id}`} key={post.id}>
      <div className="flex mb-12 rounded-2xl flex-col h-90">
        <motion.div
          className="transform transition-transform duration-500 hover:scale-102 ease-in cursor-pointer"
          variants={itemVariants}
        >
          <img
            src={post.fileUrl}
            alt={post.title}
            className="w-full h-50 object-cover rounded-2xl mb-2"
            loading="lazy"
            decoding="async"
          />
          <p className="font-medium text-sm text-gray-600 pl-2">
            {post.createdAt?.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h2 className="py-4 font-medium pl-2 text-black text-xl">
            <span className="hover:text-orange-500 duration-300 ease-in-out">
              {post.title.slice(0, 20) + "..."}
            </span>
          </h2>
          <p className="pl-2 text-sm pb-4 text-gray-700">
            {getPreviewText(post.content, 90)}
          </p>
          <div className="flex items-center pl-2">
            <button onClick={handleLike} className="flex items-center text-gray-600 hover:text-red-500 focus:outline-none z-10">
              {isLiked ? <FaHeart className="text-orange-500" /> : <FaRegHeart />}
              <span className="ml-2">{likeCount}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </Link>
  );
};


/**
 * A component that displays a preview of the first 4 blog posts.
 * @returns {JSX.Element} The rendered blog preview section.
 */
const PostsPreview = () => {
  // State to store the list of blog posts
  const [posts, setPosts] = useState([]);
  // State to manage the loading status while fetching posts
  const [isLoading, setIsLoading] = useState(false);

  /**
   * useEffect hook to fetch posts from Firestore in real-time.
   */
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postsList);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Animation variants for the main container of the posts grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
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
            initial="visible"
          >
            {/* Map over the first 4 posts and render a card for each */}
            {posts.slice(0, 4).map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default PostsPreview;
