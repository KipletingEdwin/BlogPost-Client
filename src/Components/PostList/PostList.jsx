import './PostList.css';
import React, { useState } from 'react';
import axios from 'axios';

const PostList = ({ posts, fetchPosts }) => {
  const token = localStorage.getItem('token');
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [commentText, setCommentText] = useState({});

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://your-backend-url.com/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts(); // Refresh post list after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdate = async (postId) => {
    try {
      await axios.put(`https://your-backend-url.com/posts/${postId}`, {
        title: editTitle,
        content: editContent,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingPost(null);
      fetchPosts(); // Refresh post list
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      await axios.post(`https://your-backend-url.com/posts/${postId}/comments`, {
        content: commentText[postId] || '',
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommentText({ ...commentText, [postId]: '' });
      fetchPosts(); // Refresh post list
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className='post-list'>
      <h2>Recent Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className='post-card'>
            {editingPost === post.id ? (
              <div className='edit-form'>
                <input type='text' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                <button onClick={() => handleUpdate(post.id)}>Update</button>
                <button onClick={() => setEditingPost(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.image && <img src={post.image} alt={post.title} />}
                <div className='post-actions'>
                  <button onClick={() => handleEdit(post)}>Edit</button>
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
                {/* Comment Section */}
                <div className='comment-section'>
                  <input
                    type='text'
                    placeholder='Write a comment...'
                    value={commentText[post.id] || ''}
                    onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                  />
                  <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;