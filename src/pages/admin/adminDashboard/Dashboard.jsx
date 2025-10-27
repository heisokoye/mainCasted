import React, {useState} from "react"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {addDoc, collection} from "firebase/firestore";
import { db } from "../../../Firebase";

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

  // Function to toggle the modal's visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // State to hold the content of the rich text editor
  const [content, setContent] = useState(''); 
  // Function to handle changes in the editor's content
  const handleChange = (value) => {
    setContent(value);
  };

  // Function to handle form submission and add the post to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Cannot add an empty post.");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        content: content,
        createdAt: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Post added successfully!");
      toggleModal(); // Close the modal after successful submission
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error adding post. Check the console for details.");
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
          onClick={toggleModal}
        >
          Add Posts
        </button>
        {/* Conditional rendering of the modal based on the isOpen state */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-[80%] md:w-[50%] lg:w-[40%]">
              <h2 className="text-xl mb-4">Add New Post</h2>
              <form onSubmit={handleSubmit}>
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

                <div className="flex justify-end">
                  {/* Button to close the modal */}
                  <button type="button" onClick={toggleModal} className="mr-2 px-4 py-2 bg-gray-300 cursor-pointer text-black rounded-lg">Cancel</button>
                  {/* Button to submit the new post */}
                  <button type="submit"  className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded-lg">Add Post</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <ManagePost/>
      </div>
    </div>
  );
};

export default Dashboard;