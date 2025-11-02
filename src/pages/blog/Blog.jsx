import React, {useEffect, useState} from "react" 
import {collection, onSnapshot} from "firebase/firestore"
import {db} from "../../Firebase"
import Loader from "../../components/loader/Loader";


const BlogPreview = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot)=>{
            const postsList = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setPosts(postsList);
            setIsLoading(false);
        })
        return ()=>{
            unsubscribe();
        }

    }, []);
  
  return (
    <div className =" py-20 ">
        <div className= "mx-auto w-[80%]"> 
            {
                isLoading ? <Loader/> :
                    <div className = " grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {
                        posts.map((post)=>(
                            <div key={post.id} className=" border shadow-xl  flex flex-col h-[25rem] rounded-2xl border-gray-300">
                                <div>
                                    <img src={post.fileUrl} alt={post.title} className="w-full h-60 object-cover rounded-t-2xl mb-2"/>
                                    <h2> {post.title}</h2>
                                    <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
                                </div>
                            </div>
                        ))
                    }
                    </div>
                
            }
        </div>
    </div>
  )
}

export default BlogPreview