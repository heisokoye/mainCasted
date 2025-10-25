import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Dashboard = () => {
  // Dashboard page for admin to add, edit, delete posts
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [value, setValue] = useState('');







  return (
    <div className="pt-16 bg-black h-[100vh] w-full ">
      <div className='mx-auto w-[80%]'>
        <h1 className="text-2xl mt-10"> Admin Dashboard</h1>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg cursor-pointer "
          onClick={toggleModal}
        >
          Add Posts
        </button>
        {/*if isOpen is true, show modal*/}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-[80%] md:w-[50%] lg:w-[40%]">
              <h2 className="text-xl mb-4">Add New Post</h2>
              <div>
                  <ReactQuill theme= "snow" value={value} onChange={setValue}/>
                  <div className="mt-[20px]">
                    <strong> Output: </strong>
                    <div dangerouslySetInnerHTML={{ __html: value }}></div>
                  </div>
                </div>
              <form>
                <div className="flex justify-end">
                  <button type="button" onClick={toggleModal} className="mr-2 px-4 py-2 bg-gray-300 cursor-pointer text-black rounded-lg">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded-lg">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;