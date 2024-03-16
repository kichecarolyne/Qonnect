// MyPosts.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import app from '@/Shared/firebaseConfig';
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import PostItem from '../Home/PostItem';
import Toast from '../Toast';
import PostModal from '../PostDetails.js/PostModal';

// Create the context
export const SelectedPostContext = createContext();

export const useSelectedPost = () => useContext(SelectedPostContext);

function MyPosts() {
  const { data: session } = useSession();
  const [userPost, setUserPost] = useState([]);
  const db = getFirestore(app);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getUserPost();
  }, [session, showToast]);

  const getUserPost = async () => {
    setUserPost([]);
    if (session?.user.email) {
      const q = query(collection(db, 'posts'), where('email', '==', session?.user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        setUserPost(userPost => [...userPost, data]);
      });
    }
  };

  const onDeletePost = async id => {
    await deleteDoc(doc(db, 'posts', id));
    setShowToast(true);
    window.location.reload();
  };

  const onPostClick = item => {
    setSelectedPost(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  return (
    <SelectedPostContext.Provider value={{ selectedPost, setSelectedPost }}>
      <div className="p-6 mt-8">
        {showToast ? (
          <div className="absolute top-10 right-10">
            <Toast msg={'Post Deleted Successfully'} closeToast={() => setShowToast(true)} />
          </div>
        ) : null}
        <div className="justify items-center">
          <p>Manage Your Posts</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 px-10">
          {userPost &&
            userPost?.map((item, index) => (
              <div key={index} onClick={() => onPostClick(item)}> {/* Changed setShowModal to onPostClick */}
                <PostItem post={item} />
              </div>
            ))}
        </div>
        {/* Pass showModal state as prop to MyPostsModal component */}
        {showModal ? <PostModal setShowModal={setShowModal} post={selectedPost} /> : null}
      </div>
    </SelectedPostContext.Provider>
  );
}

export default MyPosts;
