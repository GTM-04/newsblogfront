import { Clock, FileText, Mic, TrendingUp, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getArticles } from '../../../api/articles';
import { getPodcasts } from '../../../api/podcasts';
import { getVideos } from '../../../api/videos';
import { Card } from '../ui/card';

interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalPodcasts: number;
  totalVideos: number;
  recentArticles: any[];
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalPodcasts: 0,
    totalVideos: 0,
    recentArticles: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [allArticles, published, drafts, podcasts, videos] = await Promise.all([
          getArticles({ page_size: 1 }),
          getArticles({ status: 'PUBLISHED', page_size: 1 }),
          getArticles({ status: 'DRAFT', page_size: 1 }),
          getPodcasts({ page_size: 1 }),
          getVideos({ page_size: 1 }),
        ]);

        const recent = await getArticles({ page_size: 5, ordering: '-created_at' });

        setStats({
          totalArticles: allArticles.count,
          publishedArticles: published.count,
          draftArticles: drafts.count,
          totalPodcasts: podcasts.count,
          totalVideos: videos.count,
          recentArticles: recent.results,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Articles',
      value: stats.totalArticles,
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Published',
      value: stats.publishedArticles,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Drafts',
      value: stats.draftArticles,
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      title: 'Podcasts',
      value: stats.totalPodcasts,
      icon: Mic,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Videos',
      value: stats.totalVideos,
      icon: Video,
      color: 'text-[#B8336A]',
      bg: 'bg-[#B8336A]/10',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8336A] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
          Dashboard
        </h1>
        <p className="text-muted-foreground">Welcome to the Pulse & Passion admin portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </Card>
          );
        })}
      </div>

      {/* Recent Articles */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Recent Articles</h2>
        <div className="space-y-4">
          {stats.recentArticles.length > 0 ? (
            stats.recentArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{article.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${
                        article.status === 'PUBLISHED' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></span>
                      {article.status}
                    </span>
                    <span>{article.category.name}</span>
                    <span>{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">No articles yet</p>
          )}
        </div>
      </Card>
    </div>
  );
}
