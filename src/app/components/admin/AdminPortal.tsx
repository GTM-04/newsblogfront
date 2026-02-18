import { useEffect, useState } from 'react';
import { isAuthenticated } from '../../../api/auth';
import { AdminDashboard } from './AdminDashboard';
import { AdminLayout } from './AdminLayout';
import { AdminLogin } from './AdminLogin';
import { ArticleForm } from './ArticleForm';
import { PodcastForm } from './PodcastForm';
import { VideoForm } from './VideoForm';

export function AdminPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'create-article' | 'create-podcast' | 'create-video' | 'edit-article' | 'edit-podcast'>('dashboard');
  const [editingArticleSlug, setEditingArticleSlug] = useState<string | null>(null);
  const [editingPodcastSlug, setEditingPodcastSlug] = useState<string | null>(null);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleFormSuccess = () => {
    setCurrentView('dashboard');
    setEditingArticleSlug(null);
    setEditingPodcastSlug(null);
  };

  const handleEditArticle = (slug: string) => {
    setEditingArticleSlug(slug);
    setCurrentView('edit-article');
  };

  const handleEditPodcast = (slug: string) => {
    setEditingPodcastSlug(slug);
    setCurrentView('edit-podcast');
  };

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <AdminLayout currentView={currentView} onNavigate={setCurrentView}>
      {currentView === 'dashboard' && (
        <AdminDashboard 
          onEditArticle={handleEditArticle}
          onEditPodcast={handleEditPodcast}
        />
      )}
      {currentView === 'create-article' && (
        <ArticleForm
          onBack={() => setCurrentView('dashboard')}
          onSuccess={handleFormSuccess}
        />
      )}
      {currentView === 'edit-article' && editingArticleSlug && (
        <ArticleForm
          articleSlug={editingArticleSlug}
          onBack={() => {
            setCurrentView('dashboard');
            setEditingArticleSlug(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
      {currentView === 'create-podcast' && (
        <PodcastForm
          onBack={() => setCurrentView('dashboard')}
          onSuccess={handleFormSuccess}
        />
      )}
      {currentView === 'edit-podcast' && editingPodcastSlug && (
        <PodcastForm
          podcastSlug={editingPodcastSlug}
          onBack={() => {
            setCurrentView('dashboard');
            setEditingPodcastSlug(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
      {currentView === 'create-video' && (
        <VideoForm
          onBack={() => setCurrentView('dashboard')}
          onSuccess={handleFormSuccess}
        />
      )}
    </AdminLayout>
  );
}
