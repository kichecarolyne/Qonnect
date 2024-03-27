// Import necessary functions and objects from Firestore module
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Shared/firebaseConfig';

// Define searchPosts function
export const searchPosts = async (searchTerm) => {
  try {
    const q = query(collection(db, 'posts'), where('title', 'content', '>=', searchTerm));
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.error('Error searching posts:', error);
    return []; // Return empty array in case of error
  }
};
