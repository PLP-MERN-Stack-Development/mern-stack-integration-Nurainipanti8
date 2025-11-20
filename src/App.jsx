// client/src/App.jsx (Snippet for Routes)
import { Routes, Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from "./pages/LoginPage";// New component
import ProtectedRoute from '../components/ProtectedRoute'; // New component
import CreatePostPage from "./pages/CreatePostPage.jsx";


function App() {
  return (
    // ... Layout components ...
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PostListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes (Requires Authentication) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/posts/new" element={<CreatePostPage />} />
        <Route path="/posts/edit/:id" element={<CreatePostPage />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
    // ...
  );
}

export default App;