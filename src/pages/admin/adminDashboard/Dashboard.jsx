import React, {useState, useEffect} from "react"
import ReactQuill from 'react-quill-new'; // rich text editor used for post content
import 'react-quill-new/dist/quill.snow.css';
import {addDoc, collection, serverTimestamp} from "firebase/firestore"; // used to add new documents
import { db} from "../../../Firebase"; // firebase exports (Firestore + Storage)
import {listenToPosts} from "./firestoreListen" // helper that listens to posts collection changes
import {doc, updateDoc, deleteDoc} from "firebase/firestore"; // CRUD helpers for Firestore
import Loader from "../../../components/loader/Loader"; // spinner component shown while loading data

// Configuration for the ReactQuill editor's toolbar
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }], // header dropdown (H1, H2, normal)
    ['bold', 'italic', 'underline', 'strike', 'blockquote'], // inline styles
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], // lists/indent
    ['link', 'image', 'video'], // media / link
    ['clean'] // remove formatting
  ],
};

// Allowed formats for the ReactQuill editor (keeps editor content predictable)
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

// The main Dashboard component for the admin panel
const Dashboard = () => {
  // Controls whether the "Add / Edit Post" modal is visible
  const [isOpen, setIsOpen] = useState(false);
  
  // loading state: true while we fetch posts from Firestore
  const [loading, setLoading] = useState(true);

  // File upload state
  const [file, setFile] = useState(null); // selected file object (image/video)
  const [uploadProgress, setUploadProgress] = useState(0); // percentage during upload
  const [isUploading, setIsUploading] = useState(false); // disables form buttons during upload

  // Editing state: when editing an existing post, this holds the post object
  // null => adding a new post
  const [editingPost, setEditingPost] = useState(null);

  // Title / content of the post form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); 

  // Local cached posts fetched from Firestore
  const [posts, setPosts] = useState([]);

  // Open the modal. If a post is supplied we populate the form for editing.
  const openModal = (post = null) => {
    if (post) {
      // entering "edit" mode: populate fields with post's data
      setEditingPost(post);
      setTitle(post.title);
      setContent(post.content);
    } else {
      // entering "add" mode: reset fields
      setEditingPost(null);
      setTitle('');
      setContent('');
      setFile(null);
    }
    // toggle modal visibility
    setIsOpen(!isOpen);
  };

  // Handler for editor content change
  const handleChange = (value) => {
    setContent(value);
  };

  // File input change handler
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // on mount: subscribe to posts collection via listenToPosts helper
  // listenToPosts should call the provided callback with an array of posts
  // and return an unsubscribe function.
  useEffect(() => {
    const unsubscribe = listenToPosts((fetchedPosts) => {
      setPosts(fetchedPosts);
      setLoading(false); // data received -> stop showing loader
    });
    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  // Form submit handler used for both adding new posts and updating existing ones
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: title required
    if (!title.trim()) {
      alert("Title cannot be empty.");
      return;
    }

    setIsUploading(true); // disable controls & show upload progress if file exists

    // default to values from the editing post if present
    let fileUrl = editingPost ? editingPost.fileUrl : '';
    let fileType = editingPost ? editingPost.fileType : '';

    // If user selected a new file, upload it to Firebase Storage
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); 
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

      // Detect if it's an image or video
      const resourceType = file.type.startsWith("video") ? "video" : "image";

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dvhgc8tyi/${resourceType}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        fileUrl = data.secure_url;
        fileType = resourceType;
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        alert("Upload to Cloudinary failed. Check your network or preset settings.");
        setIsUploading(false);
        return;
      }
    }


    // Build the post object that will be saved to Firestore
    const postData = {
      title,
      content,
      fileUrl,
      fileType,
    };

    try {
      if (editingPost) {
        // Update existing document: use the post's id to get a doc ref, then update it
        const postRef = doc(db, "posts", editingPost.id);
        await updateDoc(postRef, postData);
        alert("Post updated successfully!");
      } else {
        // Add a new document to the "posts" collection with createdAt timestamp
        await addDoc(collection(db, "posts"), {
          ...postData,
          createdAt: serverTimestamp(),
        });
        alert("Post added successfully!");
      }
      // Reset form and close modal on success
      resetAndCloseModal();
    } catch (error) {
      // If an error occurs while saving, stop any loading indicators and log it
      setLoading(false);
      console.error("Error saving document: ", error);
      alert("Error saving post. Check the console for details.");
    } finally {
      // always turn off uploading flag (enable UI again)
      setIsUploading(false);
    }
  };

  // Helper to reset form state and close the modal
  const resetAndCloseModal = () => {
    setTitle('');
    setContent('');
    setFile(null);
    setUploadProgress(0);
    setIsOpen(false);
  };

  // Delete a post by ID
  const handleDelete = async(id)=>{
    try{
      await deleteDoc(doc(db, "posts", id));
      console.log("Document successfully deleted!");
    }
    catch(error){
      console.error("Error removing document: ", error);
    }
  }


  // Render the dashboard UI
  return (
    // Main container for the dashboard page
    <div className="pt-16  w-full md:h-screen lg:h-screen ">
      <div className='mx-auto w-[80%]'>
        <h1 className="text-2xl mt-10"> Admin Dashboard</h1>

        <div className="flex gap-4 mt-4 bg-white">
          {/* Button to open the modal for adding a new post */}
          <button
            className="p-2 bg-blue-500 text-white rounded-lg cursor-pointer "
            onClick={() => openModal()}
          >
            Add Posts
          </button>
          
         
        </div>

        {/* Modal for adding/editing posts - conditionally rendered */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center bg-white justify-center bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-[80%] md:w-[50%] lg:w-[40%] max-h-[60vh] overflow-y-auto">
              {/* Modal title changes depending on add vs edit mode */}
              <h2 className="text-xl mb-4">{editingPost ? 'Edit Post' : 'Add New Post'}</h2>
              <form onSubmit={handleFormSubmit}>
                {/* Title input */}
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

                {/* File input for optional image/video */}
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

                {/* Rich text editor for post content */}
                <div className="mb-4">
                  <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={handleChange} 
                    modules={modules} 
                    formats={formats}
                    className="h-96 mb-16" 
                  />
                </div>

                {/* Upload progress bar - only shown while a file is uploading */}
                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}

                {/* Modal actions */}
                <div className="flex justify-end">
                  {/* Cancel button resets the form and closes modal; disabled during upload */}
                  <button type="button" onClick={resetAndCloseModal} disabled={isUploading} className="mr-2 mt-20 px-4 py-2 bg-gray-300 cursor-pointer md:mt-2 lg:mt-2 text-black rounded-lg disabled:opacity-50">Cancel</button>

                  {/* Submit button text changes for add vs update; disabled during upload */}
                  <button type="submit" disabled={isUploading} className="px-4 py-2 bg-blue-500 mt-20 md:mt-2 lg:mt-2 text-white cursor-pointer rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {isUploading ? 'Uploading...' : (editingPost ? 'Update Post' : 'Add Post')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Posts listing section:
            - While loading: show Loader centered
            - After loading: map over posts to display cards
        */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <div>
            <div className="md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 gap-4 mt-6">
              {posts.map((post) => (
                <div key={post.id} className="border p-4 my-4 rounded-lg shadow-lg border-gray-300" >
                  {/* Conditionally render image or video if fileUrl exists */}
                  {post.fileUrl && post.fileType === 'image' && (
                    <img src={post.fileUrl} alt={post.title} className="w-full h-48 object-cover rounded-md mb-2" />
                  )}
                  {post.fileUrl && post.fileType === 'video' && (
                    <video src={post.fileUrl} controls className="w-full h-48 object-cover rounded-md mb-2" />
                  )}

                  {/* Post title */}
                  <h2 className="font-normal">{post.title}</h2>

                  {/* Actions: Edit opens the modal in edit mode; Delete removes the doc */}
                  <div>
                    <button className="bg-amber-300 px-4 py-2 mt-2 rounded-lg cursor-pointer" onClick={()=> openModal(post)}>Edit </button>
                    <button className="bg-red-500 px-4 py-2 mt-2 ml-2 rounded-lg cursor-pointer text-white" onClick={() => handleDelete(post.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;