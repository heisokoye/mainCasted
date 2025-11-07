// Import React hooks: useEffect for side effects, useState for state management
import React, { useEffect, useState } from "react";
// Import useParams to get URL parameters, Link for navigation
import { useParams, Link } from "react-router-dom";
// Import Firebase Firestore functions: doc to create document reference, getDoc to fetch document
import { doc, getDoc } from "firebase/firestore";
// Import the Firebase database instance
import { db } from "../../Firebase"; // adjust path if needed
// Import the loading spinner component
import Loader from "../../components/loader/Loader";
// Import global CSS styles
import "../../App.css"
// Import back arrow icon from react-icons
import { BsArrowLeft } from "react-icons/bs";
// Import social media icons: Twitter, Facebook, LinkedIn, WhatsApp, and generic share icon
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaShareAlt } from "react-icons/fa";

/**
 * SinglePost component fetches and displays a single blog post based on the ID from the URL.
 * It uses Firebase Firestore to retrieve post data.
 */
const SinglePost = () => {
  // Get the post ID from the URL parameters using useParams hook
  const { id } = useParams(); 
  // State to store the fetched post data, initialized as null
  const [post, setPost] = useState(null);
  // State to manage the loading status, initialized as false
  const [isLoading, setIsLoading] = useState(false);

  // useEffect hook to fetch the post data when the component mounts or the ID changes
  useEffect(() => {
    // Set loading state to true when starting to fetch
    setIsLoading(true);
    // Define async function to fetch post from Firebase
    const fetchPost = async () => {
      // Create a reference to the specific document in the 'posts' collection using the ID from URL
      const docRef = doc(db, "posts", id);
      // Fetch the document snapshot from Firestore
      const docSnap = await getDoc(docRef);
      // If the document exists in Firestore, update the post state with its data
      if (docSnap.exists()) {
        // Set the post state with the document data
        setPost(docSnap.data());
      }
      // Set loading state to false after fetch completes (success or failure)
      setIsLoading(false);
    };
    // Call the async function to fetch the post
    fetchPost();
  }, [id]); // Dependency array includes 'id' to re-run effect if ID changes

  // Function to handle social sharing on different platforms
  const handleShare = (platform) => {
    // Get the current page URL for sharing
    const postUrl = window.location.href;
    // Get the post title, or use a default message if title doesn't exist
    const postTitle = post?.title || "Check out this post from Casted! Publications";
    // Create share text combining title and URL
    const shareText = `${postTitle} - ${postUrl}`;

    // Initialize empty string for share URL
    let shareUrl = "";
    
    // Switch statement to handle different sharing platforms
    switch (platform) {
      // Case for Twitter sharing
      case "twitter":
        // Create Twitter share URL with encoded title and post URL
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
        // Break out of switch statement
        break;
      // Case for Facebook sharing
      case "facebook":
        // Create Facebook share URL with encoded post URL
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        // Break out of switch statement
        break;
      // Case for LinkedIn sharing
      case "linkedin":
        // Create LinkedIn share URL with encoded post URL
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
        // Break out of switch statement
        break;
      // Case for WhatsApp sharing
      case "whatsapp":
        // Create WhatsApp share URL with encoded share text
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        // Break out of switch statement
        break;
      // Case for native device share (mobile devices)
      case "native":
        // Check if browser supports native share API
        if (navigator.share) {
          // Use native share API with post details
          navigator.share({
            title: postTitle, // Share title
            text: post?.content?.substring(0, 100) || "", // First 100 characters of content
            url: postUrl, // Post URL
          }).catch(() => {}); // Silently catch any errors
        }
        // Return early since native share doesn't need URL
        return;
      // Default case for unknown platforms
      default:
        // Return early if platform is not recognized
        return;
    }
    
    // If shareUrl was created, open it in a new window
    if (shareUrl) {
      // Open share URL in new popup window with specified dimensions
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  // Display a message if no post is found and loading has finished
  if (!post && !isLoading) {
    // Return error message if post doesn't exist
    return <p className="text-center py-10">Post not found</p>;
  }

  // Return the main component JSX
  return (
    // Main container with vertical padding
    <div className="py-20">
      // Container with responsive width: 80% on mobile, 60% on large screens
      <div className="mx-auto w-[80%] lg:w-[60%]">
        {/* Conditional rendering: show loader while fetching, otherwise show post content. */}
        // Ternary operator: show loader if loading, otherwise show post content
        {isLoading ? (
          // Loading container with centered flex layout and fixed height
          <div className="flex justify-center items-center h-64">
            // Display loading spinner component
            <Loader />
          </div>
        ) : (
          // Article element for semantic HTML
          <article className="bg-white ">
            // Container with bottom margin for spacing
            <div className="mb-8">
              {/* Link to navigate back to the blog page. */}
              // Link component to navigate back to blog listing page
              <Link to="/blog" className="flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-300">
                // Back arrow icon with width, height, and right margin
                <BsArrowLeft className="w-5 h-5 mr-2" />
                // Text label for back link
                Back to Blog
              </Link>
            </div>
            {/* Display post title. */}
            // Main heading with large text, bold weight, gray color, and bottom margin
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
            // Container for post metadata with flex layout
            <div className="flex items-center text-gray-500 mb-6">
              {/* Display post author, defaulting to "Admin" if not available. */}
              // Paragraph showing author name with right margin, defaulting to "Admin"
              <p className="mr-4">By {post.author || "Admin"}</p>
              {/* Display formatted creation date. */}
              // Paragraph displaying formatted date
              <p>
                // Format the Firestore timestamp to readable date string
                {post.createdAt?.toDate().toLocaleDateString("en-US", {
                  year: "numeric", // Show full year (e.g., 2024)
                  month: "long", // Show full month name (e.g., December)
                  day: "numeric", // Show day number (e.g., 15)
                })}
              </p>
            </div>
            {/* Display post image. */}
            // Post featured image
            <img
              src={post.fileUrl} // Image source URL from post data
              alt={post.title} // Alt text for accessibility
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl mb-8 shadow-md" // Full width, auto height, max height, cover object fit, rounded corners, bottom margin, shadow
            />
            {/* Display post content, using dangerouslySetInnerHTML as content is HTML. */}
            // Container for post HTML content
            <div
              className="prose post-content lg:prose-xl max-w-none text-gray-800" // Prose styling, larger on large screens, no max width, gray text
              dangerouslySetInnerHTML={{ __html: post.content }} // Render HTML content from post
            />
            
            {/* Social Sharing Buttons - Mobile Only */}
            // Container for social sharing section, hidden on medium and large screens
            <div className="md:hidden lg:hidden mt-8 pt-6 border-t border-gray-200">
              // Flex container with column direction and centered items
              <div className="flex flex-col items-center">
                // Heading for share section with large text, semibold weight, gray color, bottom margin
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Share this post</h3>
                // Container for share buttons with flex layout, gap, center alignment
                <div className="flex gap-4 justify-center items-center">
                  // Twitter share button
                  <button
                    onClick={() => handleShare("twitter")} // Call handleShare with "twitter" platform
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-300 shadow-md" // Circular button, blue background, white text, hover effect, shadow
                    aria-label="Share on Twitter" // Accessibility label
                  >
                    // Twitter icon with size 20
                    <FaTwitter size={20} />
                  </button>
                  // Facebook share button
                  <button
                    onClick={() => handleShare("facebook")} // Call handleShare with "facebook" platform
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 shadow-md" // Circular button, darker blue background, white text, hover effect, shadow
                    aria-label="Share on Facebook" // Accessibility label
                  >
                    // Facebook icon with size 20
                    <FaFacebook size={20} />
                  </button>
                  // LinkedIn share button
                  <button
                    onClick={() => handleShare("linkedin")} // Call handleShare with "linkedin" platform
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300 shadow-md" // Circular button, darkest blue background, white text, hover effect, shadow
                    aria-label="Share on LinkedIn" // Accessibility label
                  >
                    // LinkedIn icon with size 20
                    <FaLinkedin size={20} />
                  </button>
                  // WhatsApp share button
                  <button
                    onClick={() => handleShare("whatsapp")} // Call handleShare with "whatsapp" platform
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 shadow-md" // Circular button, green background, white text, hover effect, shadow
                    aria-label="Share on WhatsApp" // Accessibility label
                  >
                    // WhatsApp icon with size 20
                    <FaWhatsapp size={20} />
                  </button>
                  // Conditional rendering: only show native share if browser supports it
                  {navigator.share && (
                    // Native share button (for mobile devices)
                    <button
                      onClick={() => handleShare("native")} // Call handleShare with "native" platform
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300 shadow-md" // Circular button, orange background, white text, hover effect, shadow
                      aria-label="Share via native share" // Accessibility label
                    >
                      // Generic share icon with size 20
                      <FaShareAlt size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

// Export the component as default export
export default SinglePost;
