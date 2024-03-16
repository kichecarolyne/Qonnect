import React from "react";
import TechList from "./TechList";
import PostInfo from "./PostInfo";
import { updateDoc, setDoc, deleteDoc, getFirestore, doc } from "firebase/firestore";
import app from "../../Shared/firebaseConfig";
import { useSession } from "next-auth/react";

function PostModal({ showModal, setShowModal, post }) {
  const db = getFirestore(app);
  const { data: session } = useSession();
  const userEmail = session ? session.user?.email : null;

  const updatePost = async () => {
    const postRef = doc(db, "posts", post.id);
    const newData = {
        title: "New Title",
        description: "New Description",
        link: "New Link",
    };
    
    await updateDoc(postRef, newData)
      .then((resp) => {
        console.log(resp);
        setShowModal(false); // Close modal after successful update
      })
      .catch((error) => console.error("Error updating document: ", error));
    
    window.location.reload();
  };

  
  const setPost = async () => {
    await setDoc(doc(db, "posts", post.id), post)
      .then((resp) => {
        console.log(resp);
        setShowModal(false); // Close modal after successfully setting the post
        window.location.reload();
      })
      .catch((error) => console.error("Error setting document: ", error));
  };
  
  
  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", post.id))
      .then((resp) => {
        console.log(resp);
        setShowModal(false); // Close modal after successful deletion
      })
      .catch((error) => console.error("Error deleting document: ", error));
    
    window.location.reload();
  };
  

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black opacity-25"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-4xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none text-white">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div>
                    <PostInfo post={post} />
                  </div>
                  <TechList />
                </div>
                <div>
                  <p>Rate</p>
                  <p>Comment</p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {post && userEmail === post.email && (
                    <>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => updatePost()}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setPost()}
                      >
                        Save
                      </button>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={deletePost}
                      >
                        Delete
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
