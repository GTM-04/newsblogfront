import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getArticles, type Article } from '../../api/articles';
import { Card } from './ui/card';

interface NewsPageProps {
  onBack: () => void;
}

export function NewsPage({ onBack }: NewsPageProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getArticles({ status: 'PUBLISHED', page_size: 20, ordering: '-created_at' });
        setArticles(response.results);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8336A] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Latest News from Zimbabwe
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Stay informed with the latest developments in sexual health, relationships, and wellness across Zimbabwe.
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                {article.hero_image && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={article.hero_image} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#B8336A] uppercase tracking-wide">
                      {article.category.name}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.view_count} views</span>
                    <button className="text-[#B8336A] font-semibold hover:underline">
                      Read More →
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
