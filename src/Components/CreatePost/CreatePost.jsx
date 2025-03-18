import './CreatePost.css'
import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('https://your-backend-url.com/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      onPostCreated(); // Refresh post list
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className='create-post-container'>
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} required />
        <input type='file' onChange={(e) => setImage(e.target.files[0])} />
        <button type='submit'>Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
