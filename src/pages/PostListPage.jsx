// client/src/pages/PostListPage.jsx
import React, { useEffect } from 'react';
import { postApi } from '../api/postApi';
import useApi from '../hooks/useApi';
import { Link } from 'react-router-dom';

function PostListPage() {
  // Use the custom hook for fetching all posts
  const { data: postsData, loading, error, execute } = useApi(postApi.getAllPosts);

  useEffect(() => {
    execute(); // Execute the API call on component mount
  }, [execute]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  const posts = postsData?.posts || []; // Safely access the posts array

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Blog Posts</h1>
      <Link to="/posts/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Create New Post
      </Link>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="p-4 border rounded shadow-sm">
            <Link to={`/posts/${post._id}`} className="text-xl font-semibold text-indigo-600 hover:text-indigo-800">
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">Category: {post.category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostListPage;