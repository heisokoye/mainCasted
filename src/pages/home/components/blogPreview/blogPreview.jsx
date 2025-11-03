import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../Firebase";
import Loader from "../../../../components/loader/Loader";
import { Link } from "react-router-dom";
import {motion} from "framer-motion"


const BlogPreview = () => {
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

  const containerVariants = {
    hidden: {opacity: 0},
    visible:{
        opacity:1,
        transition: {staggerChildren: 0.3, delayChildren: 0.2}
    },
  }

  const itemVariants ={
    hidden: {y:20, opacity:0},
    visible: {y:0, opacity:1, transition: {type: "spring", stiffness: 100}}, 
  }

  return (
    <div className="py-20">
      <div className="mx-auto w-[80%]">
        {isLoading ? (
          <Loader />
        ) : (
          <motion.section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10" variants ={containerVariants}>
            {posts.slice(0, 4).map((post) => (
              <Link to= {`/post/${post.id}`}> 
                <div key={post.id} className="flex mb-12 flex-col h-80">
                  <motion.div className= "transform px-4  transition-transform  duration-500 hover:scale-102 ease-in cursor-pointer" variants = {itemVariants}>
                      <Link to= {`/post/${post.id}`}>
                          <img
                              src={post.fileUrl}
                              alt={post.title}
                              className="w-full h-50 object-center  rounded-2xl mb-2"
                          />
                      </Link>
                    <p className="font-medium text-sm text-gray-600 pl-2">
                      {post.createdAt?.toDate().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="py-4 font-medium pl-2 text-black text-xl">
                      <Link to= {`/post/${post.id}`} className="hover:text-orange-500 duration ease-in-out cursor-pointer" >
                          {post.title}
                      </Link>
                    </h2>
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
