import React, {useState, useEffect} from "react"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {addDoc, collection} from "firebase/firestore";
import { db, storage } from "../../../Firebase";
import {listenToPosts} from "./firestoreListen"
import {doc, updateDoc, deleteDoc} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Configuration for the ReactQuill editor's toolbar
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};



// Allowed formats for the ReactQuill editor
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

// The main Dashboard component for the admin panel
const Dashboard = () => {
  // State to manage the visibility of the "Add Post" modal
  const [isOpen, setIsOpen] = useState(false);

  // State for file upload
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  // State to track the post being edited. null if in "add" mode.
  const [editingPost, setEditingPost] = useState(null);

  // Function to toggle the modal's visibility
  const openModal = (post = null) => {
    if (post) {
      setEditingPost(post);
      setTitle(post.title);
      setContent(post.content);
    } else {
      setEditingPost(null);
      setTitle('');
      setContent('');
      setFile(null);
    }
    setIsOpen(!isOpen);
  };

  // State to hold the title of the post
  const [title, setTitle] = useState('');
  // State to hold the content of the rich text editor
  const [content, setContent] = useState(''); 
  // Function to handle changes in the editor's content
  const handleChange = (value) => {
    setContent(value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [posts, setPosts] = useState([]);

  // Effect hook to set up a listener for Firestore posts on component mount
  useEffect(() => {
    const unsubscribe = listenToPosts(setPosts);
    return () => unsubscribe();
  }, []);
  
  // Function to handle form submission for both adding and editing posts
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title cannot be empty.");
      return;
    }

    setIsUploading(true);

    let fileUrl = editingPost ? editingPost.fileUrl : '';
    let fileType = editingPost ? editingPost.fileType : '';

    if (file) {
      const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Upload failed:", error);
            alert("File upload failed. Please try again.");
            setIsUploading(false);
            reject(error);
          },
          async () => {
            fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
            fileType = file.type.startsWith('image/') ? 'image' : 'video';
            resolve();
          }
        );
      });
    }

    const postData = {
      title,
      content,
      fileUrl,
      fileType,
    };

    try {
      if (editingPost) {
        // Update existing post
        const postRef = doc(db, "posts", editingPost.id);
        await updateDoc(postRef, postData);
        alert("Post updated successfully!");
      } else {
        // Add new post
        await addDoc(collection(db, "posts"), {
          ...postData,
          createdAt: new Date()
        });
        alert("Post added successfully!");
      }
      resetAndCloseModal();
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Error saving post. Check the console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetAndCloseModal = () => {
    setTitle('');
    setContent('');
    setFile(null);
    setUploadProgress(0);
    setIsOpen(false);
  };

  const handleDelete = async(id)=>{
    try{
      await deleteDoc(doc(db, "posts", id));
      console.log("Document successfully deleted!");
    }
    catch(error){
      console.error("Error removing document: ", error);
    }
  }

  return (
    // Main container for the dashboard page
    <div className="pt-16  h-[100vh] w-full ">
      <div className='mx-auto w-[80%]'>
        <h1 className="text-2xl mt-10"> Admin Dashboard</h1>
        {/* Button to open the modal for adding a new post */}
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg cursor-pointer "
          onClick={() => openModal()}
        >
          Add Posts
        </button>
        {/* Conditional rendering of the modal based on the isOpen state */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-[80%] md:w-[50%] lg:w-[40%] max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl mb-4">{editingPost ? 'Edit Post' : 'Add New Post'}</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">Image/Video</label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div className="mb-4">
                  {/* The rich text editor component */}
                  <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={handleChange} 
                    modules={modules} 
                    formats={formats}
                    // Use Tailwind CSS classes to style the editor container (for height)
                    className="h-96 mb-16" 
                    
                  />
                </div>

                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}

                <div className="flex justify-end">
                  {/* Button to close the modal */}
                  <button type="button" onClick={resetAndCloseModal} disabled={isUploading} className="mr-2 mt-20 px-4 py-2 bg-gray-300 cursor-pointer md:mt-2 lg:mt-2 text-black rounded-lg disabled:opacity-50">Cancel</button>
                  {/* Button to submit the new post */}
                  <button type="submit" disabled={isUploading} className="px-4 py-2 bg-blue-500 mt-20 md:mt-2 lg:mt-2 text-white cursor-pointer rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">{isUploading ? 'Uploading...' : (editingPost ? 'Update Post' : 'Add Post')}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      
        <div>
          <div className="md-grid md:grid-cols-3 lg:grid lg:grid-cols-4 gap-4 mt-6">
            {posts.map((post)=>(
              <div key={post.id} className="border p-4 my-4 rounded-lg shadow-lg border-gray-300">
                {post.fileUrl && post.fileType === 'image' && (
                  <img src={post.fileUrl} alt={post.title} className="w-full h-48 object-cover rounded-md mb-2" />
                )}
                {post.fileUrl && post.fileType === 'video' && (
                  <video src={post.fileUrl} controls className="w-full h-48 object-cover rounded-md mb-2" />
                )}
                <h2 className="font-normal">{post.title}</h2>
                <div>
                  <button className="bg-amber-300 px-4 py-2 mt-2 rounded-lg cursor-pointer" onClick={()=> openModal(post)}>Edit </button>
                  <button className="bg-red-500 px-4 py-2 mt-2 ml-2 rounded-lg cursor-pointer text-white" onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;