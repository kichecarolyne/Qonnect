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

function PostModal({ showModal, setShowModal, post, inProfile }) {
  const db = getFirestore(app);
  const [showToast, setShowToast] = useState(false);
  const { data: session } = useSession();
  const { selectedPost, setSelectedPost, 
    editedTitle, setEditedTitle, 
    editedDescription, setEditedDescription,
    editedDate, setEditedDate,
    editedLocation, setEditedLocation,
    editedLink, setEditedLink,
    editedAdditionalDetails, setEditedAdditionalDetails } = useSelectedPost();


  const userEmail = session ? session.user?.email : null;
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState(post?.ratings || []);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [setShowRatingToast] = useState(false);
  const [setShowCommentToast] = useState(false);
  const { userPosts, setUserPosts } = useUserPosts(); // Retrieve userPosts from the context
  const { updateUserPost } = userPosts;

  const totalRatings = ratings.length;
  const sumOfRatings = ratings.reduce((acc, rating) => acc + rating, 0);
  const averageRating = totalRatings > 0 ? sumOfRatings / totalRatings : "No ratings yet";

  const [titleClicked, setTitleClicked] = useState(false);
  const [descriptionClicked, setDescriptionClicked] = useState(false);
  const [dateClicked, setDateClicked] = useState(false);
  const [locationClicked, setLocationClicked] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);
  const [additionalDetailsClicked, setAdditionalDetailsClicked] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);


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

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  useEffect(() => {
    // Update the browser's search bar when the modal is opened
    if (showModal) {
      const url = `/${post.userName}/${post.categoryList}/${post.id}`;
      window.history.replaceState(null, null, url);
    }
  }, [showModal, post]);

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


  // Post Edit
  const handleFieldChange = (updatedPost) => {
    setEditedPost(updatedPost);
  };

  const handleTitleChange = (event) => {
  setEditedTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
  setEditedDescription(event.target.value);
  };

  const handleDateChange = (event) => {
  setEditedDate(event.target.value);
  };

  const handleLocationChange = (event) => {
  setEditedLocation(event.target.value);
  };

  const handleLinkChange = (event) => {
  setEditedLink(event.target.value);
  };

  const handleAdditionalDetailsChange = (event) => {
  setEditedAdditionalDetails(event.target.value);
  };

  const handleEditButtonClick = () => {
    // State variables to enable editing
    setIsEditing(true);
    setTitleClicked(true);
    setDescriptionClicked(true);
    setDateClicked(true);
    setLocationClicked(true);
    setLinkClicked(true);
    setAdditionalDetailsClicked(true);
  };

  const handleSaveButtonClick = () => {
    updatePost();
    setIsEditing(false);
  };
  

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-auto ml-6">
            <div className="relative w-full my-6 mx-auto max-w-4xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none text-white"
                style={{
                maxWidth: "90vw", // Default width for smaller screens
                maxHeight: "100vh",
                "@media (min-width: 768px)": {
                  maxWidth: "70vw",
                  maxHeight: "70vh",
                },
                "@media (min-width: 1024px)": {
                  maxWidth: "50vw",
                  maxHeight: "60vh",
                },
              }}
            >
              <div className="p-3">
                <h1 className="text-3xl font-bold">{post.title}</h1>
              </div>
                <div className="relative p-6 flex-auto overflow-y-auto line-clamp-1">
                  <div>
                  <PostInfo post={post} isEditing={isEditing} handleFieldChange={handleFieldChange} />
                  </div>
                  <div className="mb-36">
                    <TechList post={post} />
                  </div>
                  <div className="mb-20">
                    <StarRating
                      rating={rating}
                      totalRatings={totalRatings}
                      averageRating={averageRating}
                      onChange={handleRatingChange}
                      disabled={ratingSubmitted}
                    />
                    <button onClick={handleRatingSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                      Submit Rating
                    </button>
                  </div>
                  <div className="mb-14">
                    <form onSubmit={handleCommentSubmit}>
                      <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Enter your comment..."
                        className="w-full border rounded p-2 mb-4"
                        style={{ color: 'black' }}
                      />
                      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit Comment
                      </button>
                    </form>
                  </div>
                  <div className="mb-4">
                    {/* Display comments */}
                    {comments.map((comment, index) => (
                      <div key={index} className="mb-2">
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
                        onClick={handleEditButtonClick}
                      >
                        Edit
                      </button>
                      {/* Save button */}
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          updatePost();
                          setShowModal(false);
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
        </>
      )}
    </>
  );
}

export default PostModal;

