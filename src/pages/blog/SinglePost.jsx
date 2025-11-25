import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase"; // adjust path if needed
import Loader from "../../components/loader/Loader";
import "../../App.css"
import { BsArrowLeft } from "react-icons/bs";
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaShareAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

/**
 * SinglePost component fetches and displays a single blog post based on the ID from the URL.
 * It uses Firebase Firestore to retrieve post data.
 */
const SinglePost = () => {
  // Get the post ID from the URL parameters.
  const { id } = useParams(); 
  // State to store the fetched post data.
  const [post, setPost] = useState(null);
  // State to manage the loading status.
  const [isLoading, setIsLoading] = useState(false);

  // useEffect hook to fetch the post data when the component mounts or the ID changes.
  useEffect(() => {
    setIsLoading(true);
    const fetchPost = async () => {
      // Create a reference to the specific document in the 'posts' collection.
      const docRef = doc(db, "posts", id);
      // Fetch the document snapshot.
      const docSnap = await getDoc(docRef);
      // If the document exists, set the post state with its data.
      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
      setIsLoading(false);
    };
    fetchPost();
  }, [id]); // Dependency array includes 'id' to re-run effect if ID changes.

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // Function to handle social sharing
  const handleShare = (platform) => {
    const postUrl = window.location.href;
    const postTitle = post?.title || "Check out this post from Casted! Publications";
    const shareText = `${postTitle} - ${postUrl}`;

    let shareUrl = "";
    
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        break;
      case "native":
        if (navigator.share) {
          navigator.share({
            title: postTitle,
            text: post?.content ? stripHtml(post.content).substring(0, 100) : "",
            url: postUrl,
          }).catch(() => {});
        }
        return;
      default:
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  // Display a message if no post is found and loading has finished.
  if (!post && !isLoading) {
    return <p className="text-center py-10">Post not found</p>;
  }

  // Safely get the first 150 characters of the post content for the description
  const postDescription = post?.content
    ? stripHtml(post.content).substring(0, 150)
    : "Read this interesting post from Casted! Publications.";

  return (
    <div className="py-20">
      {post && (
        <Helmet>
          <title>{post.title} | Casted! Publications</title>
          <meta name="description" content={postDescription} />
          {/* Open Graph Tags */}
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={postDescription} />
          <meta property="og:image" content={post.fileUrl} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="article" />
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={postDescription} />
          <meta name="twitter:image" content={post.fileUrl} />
        </Helmet>
      )}
      <div className="mx-auto w-[80%] lg:w-[60%]">
        {/* Conditional rendering: show loader while fetching, otherwise show post content. */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <article className="bg-white ">
            <div className="mb-8">
              {/* Link to navigate back to the blog page. */}
              <Link to="/blog" className="flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-300">
                <BsArrowLeft className="w-5 h-5 mr-2" />
                Back to Blog
              </Link>
            </div>
            {/* Display post title. */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-500 mb-6">
              {/* Display post author, defaulting to "Admin" if not available. */}
              <p className="mr-4">By {post.author || "Admin"}</p>
              {/* Display formatted creation date. */}
              <p>
                {post.createdAt?.toDate().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            {/* Display post image. */}
            <img
              src={post.fileUrl}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl mb-8 shadow-md"
            />
            {/* Display post content, using dangerouslySetInnerHTML as content is HTML. */}
            <div
              className="prose post-content lg:prose-xl max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Social Sharing Buttons - Mobile Only */}
            <div className="md:hidden lg:hidden mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Share this post</h3>
                <div className="flex gap-4 justify-center items-center">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-300 shadow-md"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter size={20} />
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 shadow-md"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebook size={20} />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300 shadow-md"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedin size={20} />
                  </button>
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 shadow-md"
                    aria-label="Share on WhatsApp"
                  >
                    <FaWhatsapp size={20} />
                  </button>
                  {navigator.share && (
                    <button
                      onClick={() => handleShare("native")}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300 shadow-md"
                      aria-label="Share via native share"
                    >
                      <FaShareAlt size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default SinglePost;