import React, { useState, useEffect } from 'react';
import { db } from '../../../Firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from Firestore on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postsCollection = collection(db, 'posts');
        const postSnapshot = await getDocs(postsCollection);
        const postList = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort posts by creation date, newest first
        postList.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
        setPosts(postList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Function to handle deleting a post
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, 'posts', id));
        // Update state to remove the deleted post from the UI
        setPosts(posts.filter(post => post.id !== id));
        alert("Post deleted successfully!");
      } catch (error) {
        console.error("Error deleting post: ", error);
        alert("Error deleting post. See console for details.");
      }
    }
  };

  // Placeholder for edit functionality
  const handleEdit = (id) => {
    console.log("Editing post with id:", id);
    // TODO: Implement edit functionality
    // This could involve opening a modal with the post data pre-filled
    // and reusing the AddEditPost component.
    alert("Edit functionality not yet implemented.");
  };

  if (loading) {
    return <div className="text-center mt-10">Loading posts...</div>;
  }

  return (
    <div className="pt-16 h-full w-full">
      <div className='mx-auto w-[90%] py-10'>
        <h1 className="text-3xl font-bold mb-8">Manage Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {post.imageUrl && <img src={post.imageUrl} alt="Post" className="w-full h-48 object-cover" />}
              <div className="p-6">
                <div className="prose max-w-full h-24 overflow-hidden mb-4" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + '...' }} />
                <div className="flex justify-end space-x-4">
                  <button onClick={() => handleEdit(post.id)} className="text-blue-500 hover:text-blue-700"><FaEdit size={20} /></button>
                  <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700"><FaTrash size={20} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePost;