import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ArticleListPage from './pages/ArticleListPage';
import ArticleOnePage from './pages/ArticleOnePage';
import AuthPage from './pages/AuthPage';
import CreateAccountPage from './pages/CreateAccountPage';
import CreateArticlePage from './pages/CreateArticlePage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import UpdateArticlePage from './pages/UpdateArticlePage';
import AuthContext from './store/auth-context';


function App() {

  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        
        <Route path="/page/:pageId" element={<ArticleListPage />} />
        <Route path="/create" element={authCtx.isLoggedIn ? <CreateArticlePage /> : <Navigate to='/' />} />
        <Route path="/update/:articleId" element={authCtx.isLoggedIn ? <UpdateArticlePage /> : <Navigate to='/' />} />
        <Route path="/article/:articleId" element={<ArticleOnePage />} />

        <Route path="/signup/" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <CreateAccountPage />} />
        <Route path="/login/*" 
          element={authCtx.isLoggedIn ? <Navigate to='/' /> : <AuthPage />}
        />
        <Route path="/profile/" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
