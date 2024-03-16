import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Hero from "@/components/Home/Hero";
import Search from "@/components/Home/Search";
import PostList from "@/components/Home/PostList";
import app from "@/Shared/firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Posts from "@/components/Home/Posts";
import Pagination from "@/components/Home/Pagination";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const db = getFirestore(app);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postData = querySnapshot.docs.map(doc => doc.data());
    setPosts(postData);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="px-5 sm:px-7 md:px-10 mt-7">
      <Hero />
      <Search />
      <PostList />
      <Posts posts={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      <Footer />
    </div>
  );
}
