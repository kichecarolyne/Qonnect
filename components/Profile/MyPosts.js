import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSelectedPost } from '../../pages/SelectedPostContext';
import app from '@/Shared/firebaseConfig';
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import PostItem from '../Home/PostItem';
import Toast from '../Toast';
import PostModal from '../PostDetails.js/PostModal';

function MyPosts() {
  const { data: session } = useSession();
  const [userPost, setUserPost] = useState([]);
  const db = getFirestore(app);
  const { selectedPost, setSelectedPost } = useSelectedPost();
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility, initialized as false

  useEffect(() => {
    getUserPost();
  }, [session]);

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
    setShowToast(false); // Set showToast to true when post is deleted
    setUserPost(userPost => userPost.filter(post => post.id !== id)); // Remove the deleted post from state
  };

  const onPostClick = item => {
    setSelectedPost(item);
    setShowModal(true);
  };

  return (
    <div className="p-6 mt-8">
      {showToast && ( // Conditionally render the Toast component
        <div className="absolute top-10 right-10">
          <Toast msg={'Post Deleted Successfully'} closeToast={() => setShowToast(false)} />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 px-10">
        {userPost &&
          userPost.map((item, index) => (
            <div key={index} onClick={() => onPostClick(item)}> {/* Set onClick event to trigger onPostClick */}
              <PostItem post={item} />
              <button className="bg-red-500 text-white px-4 py-2 rounded mt-2" onClick={() => onDeletePost(item.id)}>Delete</button>
            </div>
          ))}
      </div>
      {showModal && <PostModal showModal={showModal} setShowModal={setShowModal} post={selectedPost} inProfile={true} />} {/* Render modal only when showModal is true */}
    </div>
  );
}

export default MyPosts;
