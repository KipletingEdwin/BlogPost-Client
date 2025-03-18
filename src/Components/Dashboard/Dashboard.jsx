import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from '../components/CreatePost';

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
      <div className='post-list'>
        {posts.map(post => (
          <div key={post.id} className='post'>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt={post.title} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
