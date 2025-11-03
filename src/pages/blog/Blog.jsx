import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import {db} from "../../Firebase"
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // helper function to slice HTML safely
  const getPreviewText = (html, limit = 150) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="py-20 h-screen lg:h-screen md:h-screen">
      <div className="mx-auto w-[80%]">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {posts.slice(0, 4).map((post) => (  
              <Link to={`/post/${post.id}`}>
                <div key={post.id} className="flex flex-col h-80">
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
                      {post.title}
                    </h2>
                    <p className="pl-2 text-sm text-gray-700">
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
