import React, { useState, useEffect } from "react";
import TechList from "./TechList";
import PostInfo from "./PostInfo";
import Profile from "@/pages/profile";
import { updateDoc, deleteDoc, getFirestore, doc, collection, getDocs, query, where } from "firebase/firestore";
import { useSelectedPost } from '../../pages/SelectedPostContext';
import { useUserPosts } from '../../pages/UserPostsContext';
import StarRating from "./StarRating";
import Comment from "./Comment";
import app from "../../Shared/firebaseConfig";
import { useSession } from "next-auth/react";
import Toast from "../Toast";

function PostModal({ showModal, setShowModal, post, inProfile }) {
  const db = getFirestore(app);
  const [showToast, setShowToast] = useState(false);
  const { data: session } = useSession();
  const { selectedPost, setSelectedPost } = useSelectedPost();
  const userEmail = session ? session.user?.email : null;
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState(post?.ratings || []);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [showRatingToast, setShowRatingToast] = useState(false);
  const [showCommentToast, setShowCommentToast] = useState(false);
  const { userPosts, setUserPosts } = useUserPosts(); // Retrieve userPosts from the context
  const { deleteUserPost, updateUserPost } = userPosts;

  const totalRatings = ratings.length;
  const sumOfRatings = ratings.reduce((acc, rating) => acc + rating, 0);
  const averageRating = totalRatings > 0 ? sumOfRatings / totalRatings : "No ratings yet";

  const handleEditButtonClick = () => {
    // Logic for handling edit button click
  };

  const [titleClicked, setTitleClicked] = useState(false);
  const [descriptionClicked, setDescriptionClicked] = useState(false);
  const [dateClicked, setDateClicked] = useState(false);
  const [locationClicked, setLocationClicked] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);
  const [additionalDetailsClicked, setAdditionalDetailsClicked] = useState(false);

  useEffect(() => {
    getUserPost();
  }, [showModal, session]);

  useEffect(() => {
    // Function to handle scrolling behavior
    const handleScrolling = (isOpen) => {
      // Disable scrolling on the body when modal is open
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        // Re-enable scrolling on the body when modal is closed
        document.body.style.overflow = 'auto';
      }
    };

    // Call handleScrolling when showModal state changes
    handleScrolling(showModal);

    // Cleanup function to reset scrolling behavior when component unmounts
    return () => {
      document.body.style.overflow = 'auto'; // Reset overflow property on unmount
    };
  }, [showModal]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const modalOverlay = document.querySelector('.modal-overlay');
      if (modalOverlay && !modalOverlay.contains(event.target)) {
        setShowModal(false);
      }
    };    
  
    if (showModal) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
  
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showModal, setShowModal]);
  
  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => {
        setShowToast(false);
      }, 3000); // Hide the toast after 3 seconds
  
      return () => clearTimeout(timeout);
    }
  }, [showToast]);

  const getUserPost = async () => {
    setUserPosts([]);
    if (session?.user.email) {
      const q = query(collection(db, 'posts'), where('email', '==', session?.user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        setUserPosts(userPosts => [...userPosts, data]);
      });
    }
  };

  const updatePost = async () => {
    const postRef = doc(db, "posts", post.id);
    const newData = {
      ...post,
      title: selectedPost.title,
      description: selectedPost.description,
      date: selectedPost.date,
      location: selectedPost.location,
      link: selectedPost.link,
      additionalDetails: selectedPost.additionalDetails,
    };

    try {
      await updateDoc(postRef, newData);
      updateUserPost(post.id, newData);
      setShowToast(true); // Show toast for successful update
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleRatingSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted rating:", rating);
    setRatings([...ratings, rating]);
    setRatingSubmitted(true);
    setShowRatingToast(true);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      text: comment,
      replies: []
    };
    setComments([...comments, newComment]);
    setComment("");
    console.log("Submitted comment:", comment);
    setShowCommentToast(true);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleTitleChange = (event) => {
    setSelectedPost({ ...selectedPost, title: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setSelectedPost({ ...selectedPost, description: event.target.value });
  };

  const handleDateChange = (event) => {
    setSelectedPost({ ...selectedPost, date: event.target.value });
  };

  const handleLocationChange = (event) => {
    setSelectedPost({ ...selectedPost, location: event.target.value });
  };

  const handleLinkChange = (event) => {
    setSelectedPost({ ...selectedPost, link: event.target.value });
  };

  const handleAdditionalDetailsChange = (event) => {
    setSelectedPost({ ...selectedPost, additionalDetails: event.target.value });
  };

  const handleTitleFieldClick = () => {
    setTitleClicked(true);
    setDescriptionClicked(false);
    setDateClicked(false);
    setLocationClicked(false);
    setLinkClicked(false);
    setAdditionalDetailsClicked(false);
  };
  const handleDescriptionFieldClick = () => {
    setDescriptionClicked(true);
    setTitleClicked(false);
    setDateClicked(false);
    setLocationClicked(false);
    setLinkClicked(false);
    setAdditionalDetailsClicked(false);
  };
  const handleDateFieldClick = () => {
    setDateClicked(true);
    setTitleClicked(false);
    setDescriptionClicked(false);
    setLocationClicked(false);
    setLinkClicked(false);
    setAdditionalDetailsClicked(false);
  };
  const handleLocationFieldClick = () => {
    setLocationClicked(true);
    setTitleClicked(false);
    setDescriptionClicked(false);
    setDateClicked(false);
    setLinkClicked(false);
    setAdditionalDetailsClicked(false);
  };
  const handleLinkFieldClick = () => {
    setLinkClicked(true);
    setTitleClicked(false);
    setDescriptionClicked(false);
    setDateClicked(false);
    setLocationClicked(false);
    setAdditionalDetailsClicked(false);
  };
  const handleAdditionalDetailsFieldClick = () => {
    setAdditionalDetailsClicked(true);
    setTitleClicked(false);
    setDescriptionClicked(false);
    setDateClicked(false);
    setLocationClicked(false);
    setLinkClicked(false);
  };

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-4xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none text-white"
                style={{
                // Adjust modal width and height for different screen sizes
                maxWidth: "90vw", // Default width for smaller screens
                maxHeight: "100vh", // Default height for smaller screens
                "@media (min-width: 768px)": {
                  maxWidth: "70vw", // Adjust width for medium screens
                  maxHeight: "70vh", // Adjust height for medium screens
                },
                "@media (min-width: 1024px)": {
                  maxWidth: "50vw", // Adjust width for large screens
                  maxHeight: "60vh", // Adjust height for large screens
                },
              }}
            >
              <div className="p-3">
                <h1 className="text-3xl font-bold">{post.title}</h1>
              </div>
                <div className="relative p-6 md:pl-8 lg:pl-12 flex-auto overflow-y-auto line-clamp-1">
                  <div>
                    <PostInfo post={post} />
                  </div>
                  <div>
                    <TechList post={post} />
                  </div>
                  <div>
                  {inProfile && titleClicked && (
                    <input
                    type="text"
                    value={selectedPost.title}
                    onChange={handleTitleChange}
                    placeholder="Enter title..."
                    style={{ color: "black" }}
                  />
                  )}
                    {/* Render description textarea only when inProfile is true */}
                    {inProfile && descriptionClicked && (
                      <textarea
                        value={selectedPost.description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter description..."
                        style={{ color: "black" }}
                      />
                    )}
                    {inProfile && dateClicked && (
                      <textarea
                      value={selectedPost.date}
                      onChange={handleDateChange}
                      placeholder="Enter date..."
                      style={{ color: "black" }}
                    />
                    )}
                    {inProfile && locationClicked && (
                      <textarea
                      value={selectedPost.location}
                      onChange={handleLocationChange}
                      placeholder="Enter location..."
                      style={{ color: "black" }}
                    />
                    )}
                    {inProfile && linkClicked && (
                      <textarea
                      value={selectedPost.link}
                      onChange={handleLinkChange}
                      placeholder="Enter link..."
                      style={{ color: "black" }}
                    />
                    )}
                    {inProfile && additionalDetailsClicked && (
                      <textarea
                      value={selectedPost.additionalDetails}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter additional details..."
                      style={{ color: "black" }}
                    />
                    )}
                  </div>
                  <div>
                    <StarRating
                      rating={rating}
                      totalRatings={totalRatings}
                      averageRating={averageRating}
                      onChange={handleRatingChange}
                      disabled={ratingSubmitted} // Pass ratingSubmitted state to disable rating stars
                    />
                    <button onClick ={handleRatingSubmit}>Submit Rating</button>
                  </div>
                  <div>
                    <form onSubmit={handleCommentSubmit}>
                      <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Enter your comment..."
                        style={{ color: 'black' }}
                      />
                      <button type="submit">Submit Comment</button>
                    </form>
                  </div>
                  <div>
                    {/* Display comments */}
                    {comments.map((comment, index) => (
                      <div key={index}>
                        <Comment comment={comment} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {inProfile && userEmail === post.email && (
                    <>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleEditButtonClick} // Call handleEditButtonClick on click
                      >
                        Edit
                      </button>
                      {/* Save button */}
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          updatePost(); // Call updatePost to update the post
                          setShowModal(false); // Close the modal after updating the post
                        }}
                      >
                        Save
                      </button>
                    </>
                  )}
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showToast && (
            <Toast
              msg={'Post Deleted Successfully'}
              closeToast={() => setShowToast(false)}
            />
          )}
        </>
      )}
    </>
  );
}

export default PostModal;

