import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc, increment, query, orderBy } from "firebase/firestore";
import { db } from "../../../../Firebase";
import Loader from "../../../../components/loader/Loader";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Single post card component
const PostCard = ({ post, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    if (likedPosts.includes(post.id)) setIsLiked(true);
  }, [post.id]);

  useEffect(() => {
    setLikeCount(post.likes || 0);
  }, [post.likes]);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    const isCurrentlyLiked = likedPosts.includes(post.id);

    setIsLiked(!isCurrentlyLiked);
    setLikeCount((prev) => (isCurrentlyLiked ? prev - 1 : prev + 1));

    const newLikedPosts = isCurrentlyLiked
      ? likedPosts.filter((id) => id !== post.id)
      : [...likedPosts, post.id];
    localStorage.setItem("likedPosts", JSON.stringify(newLikedPosts));

    const postRef = doc(db, "posts", post.id);
    try {
      await updateDoc(postRef, {
        likes: increment(isCurrentlyLiked ? -1 : 1),
      });
    } catch (error) {
      console.error("Error updating like count in Firebase: ", error);
      setIsLiked(isCurrentlyLiked);
      setLikeCount((prev) => (isCurrentlyLiked ? prev + 1 : prev - 1));
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    }
  };

  const getPreviewText = (html, limit = 150) => {
    if (!html) return "";
    const text = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <Link to={`/post/${post.id}`} key={post.id}>
      <motion.div
        className="flex mb-12 rounded-2xl flex-col h-90 cursor-pointer transform transition-transform duration-500 hover:scale-102 ease-in"
        variants={itemVariants}
      >
        <div className="relative w-full h-48">
          <img
            src={post.fileUrl}
            srcSet={`${post.fileUrl}?w=400 400w, ${post.fileUrl}?w=800 800w`}
            sizes="(max-width: 640px)  100vw, 400px, "
            alt={post.title}
            className="w-full h-full object-cover rounded-2xl mb-2"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={index === 0 ? "high" : "auto"}
          />
        </div>
        <p className="font-medium text-sm text-gray-600 pl-2">
          {post.createdAt?.toDate().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h2 className="py-4 font-medium pl-2 text-black text-xl">
          <span className="hover:text-orange-500 duration-300 ease-in-out">
            {post.title.length > 20 ? post.title.slice(0, 20) + "..." : post.title}
          </span>
        </h2>
        <p className="pl-2 text-sm pb-4 text-gray-700">{getPreviewText(post.content, 90)}</p>
        <div className="flex items-center pl-2">
          <button
            onClick={handleLike}
            className="flex items-center text-gray-600 hover:text-red-500 focus:outline-none z-10"
            aria-label={isLiked ? "Unlike post" : "Like post"}
          >
            {isLiked ? <FaHeart className="text-orange-500" /> : <FaRegHeart />}
            <span className="ml-2">{likeCount}</span>
          </button>
        </div>
      </motion.div>
    </Link>
  );
};

// Main blog preview component
const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postsList);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
  };

  return (
    <div className="py-20">
      <div className="mx-auto w-[80%]">
        <div className="justify-center flex gap-2 text-2xl font-medium py-8">
          <p>From the</p>
          <p className="text-orange-500"> Blog</p>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <motion.section
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.slice(0, 4).map((post, index) => (
              <PostCard post={post} key={post.id} index={index} />
            ))}
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default BlogPreview;
