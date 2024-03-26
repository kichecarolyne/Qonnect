import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../Shared/firebaseConfig';
import { getDocs, collection, query, where } from 'firebase/firestore';
import PostItem from './PostItem';
import PostModal from '../PostDetails.js/PostModal';

function SearchPage() {
  const router = useRouter();
  const { query: searchQuery } = router.query;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchQuery) {
          const q = query(collection(db, 'posts'), where('title', '==', searchQuery)); // Adjust 'title' to match your data structure
          const querySnapshot = await getDocs(q);
          const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setSearchResults(results);
          setLoading(false); // Set loading to false after data is fetched
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  function handlePostClick(postId, postUserName, postCategoryList) {
    const router = useRouter();
    router.push(`/${postUserName}/${postCategoryList}/${postId}`); // Update the URL structure as needed
  }

  return (
    <div>
      <h1>Search Results for: {searchQuery}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 px-10'>
          {searchResults.map((result) => (
            <div key={result.id} className="flex justify-center" onClick={() => handlePostClick(result.id, result.userName, result.categoryList)}>
              <PostItem post={result} modal={true} />
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <PostModal showModal={showModal} setShowModal={setShowModal} post={selectedPost} />
      )}
    </div>
  );
}

export default SearchPage;
