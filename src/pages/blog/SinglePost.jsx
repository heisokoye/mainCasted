import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase"; // adjust path if needed
import Loader from "../../components/loader/Loader";
import "../../App.css"
import { BsArrowLeft } from "react-icons/bs";

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

  // Display a message if no post is found and loading has finished.
  if (!post && !isLoading) {
    return <p className="text-center py-10">Post not found</p>;
  }

  return (
    <div className="py-20">
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
          </article>
        )}
      </div>
    </div>
  );
};

export default SinglePost;