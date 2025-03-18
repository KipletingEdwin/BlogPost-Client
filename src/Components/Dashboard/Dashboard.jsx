import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from '../CreatePost/CreatePost.jsx';
import PostList from '../PostList/PostList.jsx';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('https://your-backend-url.com/posts');
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className='dashboard-container'>
      <h2>Dashboard</h2>
      <CreatePost onPostCreated={fetchPosts} />
      <PostList posts={posts} />
    </div>
  );
};

export default Dashboard;