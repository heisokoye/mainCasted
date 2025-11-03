import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase"; // adjust path if needed
import Loader from "../../components/loader/Loader";
import "../../App.css"

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
    <div className="py-20 ">
      <div className="mx-auto w-[80%] lg:[60%]">
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-6">
              {post.createdAt?.toDate().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <img
              src={post.fileUrl}
              alt={post.title}
              className="w-100 max-h-[400px] object-cover rounded-2xl mb-6"
            />
            <div
              className="prose post-content lg:w-160 prose-lg prose-img:w-100 text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
