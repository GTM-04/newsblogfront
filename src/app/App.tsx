import { Analytics } from '@vercel/analytics/react';
import { useEffect, useState } from 'react';
import { FeedResponse, getHomepageFeed } from '../api/feed';
import { AdminPortal } from './components/admin/AdminPortal';
import { ArticlePage } from './components/ArticlePage';
import { Footer } from './components/Footer';
import { HeroFeature } from './components/HeroFeature';
import { Navigation } from './components/Navigation';
import { NewsPage } from './components/NewsPage';
import { PodcastsPage } from './components/PodcastsPage';
import { ReflectionsSection } from './components/ReflectionsSection';
import { ResearchStrip } from './components/ResearchStrip';
import { StoryCollage } from './components/StoryCollage';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog';
import { VideoPage } from './components/VideoPage';
import { YourQuestionsSection } from './components/YourQuestionsSection';
import heroImage from './Picture1.png';

export default function App() {
    // Modal state for homepage story details
    const [selectedStory, setSelectedStory] = useState<any | null>(null);
    const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'news' | 'podcasts' | 'video' | 'admin'>('home');


  // Homepage feed state
  const [feed, setFeed] = useState<FeedResponse | null>(null);
  const [feedLoading, setFeedLoading] = useState(true);
  const [feedError, setFeedError] = useState<string | null>(null);

  useEffect(() => {
    if (currentView !== 'home') return;
    setFeedLoading(true);
    setFeedError(null);
    getHomepageFeed(10)
      .then(data => setFeed(data))
      .catch(() => setFeedError('Failed to load homepage feed.'))
      .finally(() => setFeedLoading(false));
  }, [currentView]);

  const researchData = [
    {
      title: "Comprehensive Sex Education Reduces STI Rates by 52% in Five-Year Study",
      studyCount: 12,
      participants: 8400,
      confidence: "High" as const,
      summary: "Multi-country research demonstrates the effectiveness of evidence-based sexual health curricula in secondary schools across Zimbabwe, Zambia, and South Africa."
    },
    {
      title: "Hormone Therapy and Sexual Function: What New Data Reveals",
      studyCount: 8,
      participants: 2200,
      confidence: "Medium" as const,
      summary: "Emerging research explores the relationship between hormone treatments and sexual wellbeing in transgender individuals."
    },
    {
      title: "Cultural Factors Influencing Sexual Health Seeking Behavior",
      studyCount: 5,
      participants: 1800,
      confidence: "Medium" as const,
      summary: "Anthropological study examines how traditional beliefs and modern healthcare intersect in sexual wellness practices."
    }
  ];

  const reflectionsData = [
    {
      image: "https://images.unsplash.com/photo-1553724625-6f84f9074bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6aW1iYWJ3ZSUyMHdvbWFuJTIwcmVhZGluZ3xlbnwxfHx8fDE3NzA5MjY4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Learning to Love Myself: A Journey Through Body Acceptance",
      author: "Anonymous, 28, Harare",
      excerpt: "For years, I believed that my worth was tied to how I looked. It took time, therapy, and a lot of self-compassion to understand that my body is not an ornament—it's the vehicle through which I experience life, love, and connection.",
      readTime: "6 min"
    },
    {
      image: "https://images.unsplash.com/photo-1646457411048-93db3b3abd14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6aW1iYWJ3ZSUyMHlvdW5nJTIwd29tYW4lMjBoZWFsdGh8ZW58MXx8fHwxNzcwOTI2ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "After Abuse: Reclaiming My Right to Intimacy",
      author: "Anonymous, 34, Bulawayo",
      excerpt: "Healing from sexual trauma isn't linear. Some days, I feel strong and empowered. Other days, I need to remind myself that it's okay to take things slow, to say no, and to honor my boundaries without explanation.",
      readTime: "8 min"
    }
  ];

  const articleData = {
    category: "Science & Health",
    headline: "How Open Communication Transforms Intimate Relationships: New Research from Zimbabwe",
    subheadline: "A landmark study involving 3,200 couples across Sub-Saharan Africa reveals that structured conversation frameworks increase relationship satisfaction by 47% and reduce conflict by 38%.",
    author: "Dr. Tariro Chiweshe",
    date: "February 10, 2026",
    readTime: "12 min",
    heroImage: "https://images.unsplash.com/photo-1678059466227-d19beeff7557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6aW1iYWJ3ZSUyMGNvdXBsZSUyMHJlbGF0aW9uc2hpcHxlbnwxfHx8fDE3NzA5MjY4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    userNeed: "LEARN" as const
  };

  // Show admin portal without navigation
  if (currentView === 'admin') {
    return <AdminPortal />;
  }

  return (
    <>
      <Analytics />
      <div className="min-h-screen bg-white">
        <Navigation onNavigate={setCurrentView} />
      
      {currentView === 'home' && (
        <>
          <main>
            {feedLoading ? (
              <div className="max-w-[1280px] mx-auto px-4 py-12 text-center text-muted-foreground">Loading homepage...</div>
            ) : feedError ? (
              <div className="max-w-[1280px] mx-auto px-4 py-12 text-center text-red-500">{feedError}</div>
            ) : feed ? (
              <>
                {/* HeroFeature: use first latest_article or fallback */}
                <HeroFeature
                  image={feed.latest_articles[0]?.hero_image || heroImage}
                  category={feed.latest_articles[0]?.category?.name || 'Featured'}
                  headline={feed.latest_articles[0]?.title || 'Welcome to Pulse & Passion'}
                  summary={feed.latest_articles[0]?.summary || 'Explore the latest in sexual wellness, relationships, and health.'}
                  userNeed={feed.latest_articles[0]?.userNeed || 'LEARN'}
                />
                {/* StoryCollage: use latest_articles (skip first) */}
                <StoryCollage
                  stories={feed.latest_articles.slice(1, 4).map(article => ({
                    image: article.hero_image || heroImage,
                    category: article.category?.name || 'Article',
                    headline: article.title,
                    summary: article.summary,
                    userNeed: article.userNeed || 'LEARN',
                    body_content: article.body_content,
                    author: article.author,
                    date: article.published_at || article.created_at,
                  }))}
                  onReadMore={story => {
                    setSelectedStory(story);
                    setIsStoryModalOpen(true);
                  }}
                />
                {/* Story Modal */}
                <Dialog open={isStoryModalOpen} onOpenChange={setIsStoryModalOpen}>
                  <DialogContent className="max-w-2xl">
                    {selectedStory && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="text-2xl mb-2">{selectedStory.headline}</DialogTitle>
                        </DialogHeader>
                        <div className="mb-4">
                          <span className="text-xs font-semibold text-[#B8336A] uppercase tracking-wide mr-2">{selectedStory.category}</span>
                          <span className="text-xs text-muted-foreground">{selectedStory.date}</span>
                        </div>
                        {selectedStory.image && (
                          <img src={selectedStory.image} alt={selectedStory.headline} className="w-full h-56 object-cover rounded mb-4" />
                        )}
                        <div className="prose prose-sm max-w-none text-muted-foreground">
                          {selectedStory.body_content ? (
                            <p>{selectedStory.body_content}</p>
                          ) : (
                            <p>{selectedStory.summary}</p>
                          )}
                        </div>
                        {selectedStory.author && (
                          <div className="mt-4 text-xs text-muted-foreground">
                            By {typeof selectedStory.author === 'object'
                              ? `${selectedStory.author.first_name || ''} ${selectedStory.author.last_name || ''}`.trim()
                              : selectedStory.author}
                          </div>
                        )}
                      </>
                    )}
                  </DialogContent>
                </Dialog>
                {/* TODO: Add more sections for editor_picks, popular_articles, latest_podcasts, latest_videos as needed */}
                <ResearchStrip items={researchData} />
                <ReflectionsSection reflections={reflectionsData} />
                <YourQuestionsSection />
                {/* Quick link to article demo */}
                <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8 text-center">
                  <button 
                    onClick={() => setCurrentView('article')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#B8336A] text-white hover:bg-[#9a2a58] transition-colors"
                  >
                    View Article Page Demo
                  </button>
                </div>
              </>
            ) : null}
          </main>
          <Footer />
        </>
      )}

      {currentView === 'article' && (
        <>
          <ArticlePage {...articleData} />
          
          {/* Back to home button */}
          <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8 text-center border-t border-border">
            <button 
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-white hover:bg-gray-50 transition-colors"
            >
              ← Back to Homepage
            </button>
          </div>
          
          <Footer />
        </>
      )}

      {currentView === 'news' && (
        <>
          <NewsPage onBack={() => setCurrentView('home')} />
          <Footer />
        </>
      )}

      {currentView === 'podcasts' && (
        <>
          <PodcastsPage onBack={() => setCurrentView('home')} />
          <Footer />
        </>
      )}

      {currentView === 'video' && (
        <>
          <VideoPage onBack={() => setCurrentView('home')} />
          <Footer />
        </>
      )}
      </div>
    </>
  );
}
