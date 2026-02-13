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
  const [currentView, setCurrentView] = useState<'dashboard' | 'create-article' | 'create-podcast' | 'create-video'>('dashboard');

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleFormSuccess = () => {
    setCurrentView('dashboard');
  };

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <AdminLayout currentView={currentView} onNavigate={setCurrentView}>
      {currentView === 'dashboard' && <AdminDashboard />}
      {currentView === 'create-article' && (
        <ArticleForm
          onBack={() => setCurrentView('dashboard')}
          onSuccess={handleFormSuccess}
        />
      )}
      {currentView === 'create-podcast' && (
        <PodcastForm
          onBack={() => setCurrentView('dashboard')}
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
