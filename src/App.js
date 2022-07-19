import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Post from './components/Post';
import Pagination from './components/Pagination';

function App() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPost(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPosts = currentPage * postsPerPage;
  const indexOfFirstPosts = indexOfLastPosts - postsPerPage;
  const currentPosts = post.slice(indexOfFirstPosts, indexOfLastPosts);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mb-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Post post={currentPosts} loading={loading} />
      <Pagination postPerPage={postsPerPage} totalPosts={post.length} paginate={paginate}/>
    </div>
  );
}

export default App;
