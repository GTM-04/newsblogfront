import { useState } from 'react';
import { ArticlePage } from './components/ArticlePage';
import { Footer } from './components/Footer';
import { HeroFeature } from './components/HeroFeature';
import { Navigation } from './components/Navigation';
import { NewsPage } from './components/NewsPage';
import { PodcastsPage } from './components/PodcastsPage';
import { ReflectionsSection } from './components/ReflectionsSection';
import { ResearchStrip } from './components/ResearchStrip';
import { StoryCollage } from './components/StoryCollage';
import { VideoPage } from './components/VideoPage';
import { YourQuestionsSection } from './components/YourQuestionsSection';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'news' | 'podcasts' | 'video' | 'admin'>('home');

  // Mock data for homepage
  const heroData = {
    image: "https://images.unsplash.com/photo-1678059466227-d19beeff7557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6aW1iYWJ3ZSUyMGNvdXBsZSUyMHJlbGF0aW9uc2hpcHxlbnwxfHx8fDE3NzA5MjY4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Science & Health",
    headline: "How Open Communication Transforms Intimate Relationships: New Research from Zimbabwe",
    summary: "A landmark study involving 3,200 couples across Sub-Saharan Africa reveals that structured conversation frameworks increase relationship satisfaction by 47% and reduce conflict by 38%.",
    userNeed: "LEARN" as const
  };

  const storyCollageData = [
    {
      image: "https://images.unsplash.com/photo-1646457411048-93db3b3abd14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6aW1iYWJ3ZSUyMHlvdW5nJTIwd29tYW4lMjBoZWFsdGh8ZW58MXx8fHwxNzcwOTI2ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Mental Health",
      headline: "Understanding the Mind-Body Connection in Sexual Wellness",
      summary: "Mental health professionals explain why addressing emotional wellbeing is crucial for healthy intimacy.",
      userNeed: "LEARN" as const
    },
    {
      image: "https://images.unsplash.com/photo-1592598015799-35c84b09394c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBjb25maWRlbnR8ZW58MXx8fHwxNzcwOTI2ODQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Identity",
      headline: "Breaking Silence: LGBTQ+ Sexual Health in Southern Africa",
      summary: "New policy recommendations aim to make sexual health resources more inclusive and accessible to all communities.",
      userNeed: "KNOW" as const
    },
    {
      image: "https://images.unsplash.com/photo-1611620005823-85f11dc95a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY291cGxlJTIwaW50aW1hdGV8ZW58MXx8fHwxNzcwOTI2ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Relationships",
      headline: "The Art of Intimacy: Expert Tips for Long-Term Partners",
      summary: "Relationship therapists share evidence-based strategies for maintaining connection over decades.",
      userNeed: "ACT" as const
    }
  ];

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
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={setCurrentView} />
      
      {currentView === 'home' && (
        <>
          <main>
            <HeroFeature {...heroData} />
            <StoryCollage stories={storyCollageData} />
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
  );
}
