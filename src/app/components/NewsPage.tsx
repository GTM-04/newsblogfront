import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getArticles, incrementArticleView, type Article } from '../../api/articles';
import { formatDateWithFallback } from '../../utils/dateUtils';
import { ensureHttps } from '../../utils/imageUtils';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface NewsPageProps {
  onBack: () => void;
}

export function NewsPage({ onBack }: NewsPageProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleArticleClick = async (article: Article) => {
    setSelectedArticle(article);
    setIsPreviewOpen(true);
    
    // Increment view count in background
    try {
      const updatedArticle = await incrementArticleView(article.slug);
      // Merge the updated view count with the existing article data
      const mergedArticle = { ...article, view_count: updatedArticle.view_count };
      
      // Update the article in the list with the new view count
      setArticles(prevArticles => 
        prevArticles.map(a => a.id === article.id ? mergedArticle : a)
      );
      // Update selected article with new view count
      setSelectedArticle(mergedArticle);
    } catch (error) {
      console.error('Failed to increment view count:', error);
      // Keep the modal open with original data even if increment fails
    }
  };

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
              <Card 
                key={article.id} 
                onClick={() => handleArticleClick(article)}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                {article.hero_image && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={ensureHttps(article.hero_image)} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#B8336A] uppercase tracking-wide">
                      {article.category?.name || 'Uncategorized'}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDateWithFallback(article.published_at, article.created_at)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.view_count} views</span>
                    <span className="text-[#B8336A] font-semibold hover:underline">
                      Read More →
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Article Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl mb-2" style={{ fontFamily: "'Lora', serif" }}>
                  {selectedArticle.title}
                </DialogTitle>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="default">{selectedArticle.status}</Badge>
                  <span className="text-sm text-muted-foreground">{selectedArticle.category?.name || 'Uncategorized'}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDateWithFallback(selectedArticle.published_at, selectedArticle.created_at)}
                  </span>
                  {selectedArticle.is_editor_pick && (
                    <Badge variant="outline" className="bg-[#B8336A] text-white">Editor's Pick</Badge>
                  )}
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {selectedArticle.hero_image && (
                  <img 
                    src={ensureHttps(selectedArticle.hero_image)} 
                    alt={selectedArticle.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">SUMMARY</h3>
                  <p className="text-base leading-relaxed">{selectedArticle.summary}</p>
                </div>

                {selectedArticle.body_content && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">FULL ARTICLE</h3>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {selectedArticle.body_content}
                      </p>
                    </div>
                  </div>
                )}

                {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-muted-foreground w-full mb-2">TAGS</h3>
                    {selectedArticle.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
