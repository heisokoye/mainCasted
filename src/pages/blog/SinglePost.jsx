import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase"; // adjust path if needed
import Loader from "../../components/loader/Loader";
import "../../App.css"
import { BsArrowLeft } from "react-icons/bs";

const SinglePost = () => {
  const { id } = useParams(); // get post id from URL
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
      setIsLoading(false);
    };
    fetchPost();
  }, [id]);

  if (!post && !isLoading) {
    return <p className="text-center py-10">Post not found</p>;
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="mx-auto w-[80%] lg:w-[60%]">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <article className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <Link to="/blog" className="flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-300">
                <BsArrowLeft className="w-5 h-5 mr-2" />
                Back to Blog
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-500 mb-6">
              <p className="mr-4">By {post.author || "Admin"}</p>
              <p>
                {post.createdAt?.toDate().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <img
              src={post.fileUrl}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl mb-8 shadow-md"
            />
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