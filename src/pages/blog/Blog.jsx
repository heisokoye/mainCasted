/**
 * @file Renders the main blog page, fetching and displaying a list of blog posts from Firebase.
 */

import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../Firebase";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

/**
 * A component that displays a card for a single blog post.
 * It includes a like button with state management that is persistent
 * across reloads using localStorage and syncs with Firebase.
 * @param {{post: object}} props - The post object to display.
 * @returns {JSX.Element} The rendered post card.
 */
const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    if (likedPosts.includes(post.id)) {
      setIsLiked(true);
    }
  }, [post.id]);

  useEffect(() => {
    setLikeCount(post.likes || 0);
  }, [post.likes]);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    const isCurrentlyLiked = likedPosts.includes(post.id);

    setIsLiked(!isCurrentlyLiked);
    setLikeCount(prevCount => isCurrentlyLiked ? prevCount - 1 : prevCount + 1);

    const newLikedPosts = isCurrentlyLiked
      ? likedPosts.filter(id => id !== post.id)
      : [...likedPosts, post.id];
    localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));

    const postRef = doc(db, 'posts', post.id);
    try {
      await updateDoc(postRef, {
        likes: increment(isCurrentlyLiked ? -1 : 1)
      });
    } catch (error) {
      console.error("Error updating like count in Firebase: ", error);
      setIsLiked(isCurrentlyLiked);
      setLikeCount(prevCount => isCurrentlyLiked ? prevCount + 1 : prevCount - 1);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
  };

  const getPreviewText = (html, limit = 150) => {
    if (!html) return "";
    const text = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <Link to={`/post/${post.id}`} key={post.id}>
      <div className="flex mb-12 flex-col h-80">
        <div>
          <img
            src={post.fileUrl}
            alt={post.title}
            className="w-full h-50 object-cover rounded-2xl mb-2"
          />
          <p className="font-medium text-sm text-gray-600 pl-2">
            {post.createdAt?.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h2 className="py-4 font-medium pl-2 text-black text-xl">
            {post.title.slice(0, 20) + ""}
          </h2>
          <p className="pl-2 text-sm text-gray-700">
            {getPreviewText(post.content, 90)}
          </p>
          <div className="flex items-center pl-2 mt-2">
            <button onClick={handleLike} className="flex items-center text-gray-600 hover:text-red-500 focus:outline-none z-10">
              {isLiked ? <FaHeart className="text-orange-500" /> : <FaRegHeart />}
              <span className="ml-2">{likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

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

  // className="bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed
  return (
    <div className="py-20 bg-[url('/bg.webp')] lg:bg-[url('/v4.webp')]  bg-no-repeat bg-cover bg-fixed  lg:h-screen md:h-screen">
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
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
