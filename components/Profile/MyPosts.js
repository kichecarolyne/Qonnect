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
      const posts = [];
      querySnapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        posts.push(data);
      });
      // Sort posts based on submission time
      posts.sort((a, b) => b.submissionTime - a.submissionTime);
      setUserPost(posts.reverse()); // Reverse the order of posts
    }
  };

  const onDeletePost = async (id, event) => {
    event.stopPropagation();
    await deleteDoc(doc(db, 'posts', id));
    setShowToast(true); // Set showToast to true when post is deleted
    setUserPost(userPost => userPost.filter(post => post.id !== id)); // Remove the deleted post from state
  };

  const onPostClick = item => {
    setSelectedPost(item);
    setShowModal(true);
  };

  return (
    <div className="p-6 mt-8 flex justify-center">
      {showToast && ( // Conditionally render the Toast component
        <div className="absolute top-10 right-10">
          <Toast msg={'Post Deleted Successfully'} closeToast={() => setShowToast(false)} />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-10">
        {userPost &&
          userPost.map((item, index) => (
            <div key={index} className='flex flex-col items-center' onClick={() => onPostClick(item)}>
              <PostItem post={item} />
              <button className="bg-red-500 text-white px-4 py-2 rounded mt-2" onClick={(e) => onDeletePost(item.id, e)}>Delete</button>
            </div>
          ))}
      </div>
      {showModal && <PostModal showModal={showModal} setShowModal={setShowModal} post={selectedPost} inProfile={true} />} {/* Render modal only when showModal is true */}
    </div>
  );
}

export default MyPosts;
