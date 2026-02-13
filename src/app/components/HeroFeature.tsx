import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface HeroFeatureProps {
  image: string;
  category: string;
  headline: string;
  summary: string;
  userNeed: 'KNOW' | 'LEARN' | 'FEEL' | 'ACT';
}

export function HeroFeature({ image, category, headline, summary, userNeed }: HeroFeatureProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userNeedColors = {
    KNOW: 'bg-[#B8336A] text-white',
    LEARN: 'bg-[#2E5D8E] text-white',
    FEEL: 'bg-[#8B5A8B] text-white',
    ACT: 'bg-[#D97F4B] text-white'
  };

  const fullStory = `
    ### The Vision
    
    Pulse & Passion aims to redefine sexual wellness by creating a safe, inclusive digital space. We bridge the gap between scientific insight and daily relationship dynamics, making "taboo" conversations accessible and empowering.
    
    ### Core Focus
    
    Our project addresses the intersection of libido and communication. We focus on normalized dialogue, expectation management, and practical enhancements for long-term relational intimacy.
    
    ### Platform Strategy
    
    A cohesive ecosystem designed for maximum reach and depth:
    
    • Website/Blog: In-depth articles, research summaries, and practical guides
    • Social Media: Quick tips, myths vs facts, and community engagement
    • Podcasts: Expert interviews and real conversations about intimacy
    • Videos: Educational content and animated explainers
    
    ### Target Audience
    
    Primarily young adults and modern couples who are seeking evidence-based resources to navigate the complexities of desire and connection in the digital age.
    
    ### Our Approach
    
    We combine scientific research with practical advice, creating content that is:
    • Evidence-based and research-backed
    • Culturally sensitive and inclusive
    • Accessible and non-judgmental
    • Action-oriented and practical
    
    ### Topics We Cover
    
    • Communication strategies for discussing desires and boundaries
    • Understanding libido variations and arousal patterns
    • Managing expectations in long-term relationships
    • Practical techniques for enhancing intimacy
    • Mental health and its impact on sexual wellness
    • Navigating challenges with empathy and understanding
    
    ### Join Our Community
    
    Whether you're navigating new relationships or looking to deepen long-term connections, Pulse & Passion provides the resources, community, and support you need to thrive in your intimate life.
  `;

  return (
    <>
      <article className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Image */}
          <div className="relative aspect-[16/10] bg-muted overflow-hidden">
            <img 
              src={image} 
              alt={headline}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-wider text-[#B8336A] font-semibold">
                {category}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${userNeedColors[userNeed]}`}>
                {userNeed}
              </span>
            </div>
            
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {headline}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {summary}
            </p>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#B8336A] transition-colors"
            >
              Read the full story
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </article>

      {/* Full Story Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl mb-4" style={{ fontFamily: "'Lora', serif" }}>
              {headline}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <img 
              src={image} 
              alt={headline}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div className="prose prose-lg max-w-none">
              {fullStory.split('\n\n').map((paragraph, index) => {
                if (paragraph.trim().startsWith('###')) {
                  // This is a heading
                  const heading = paragraph.trim().replace(/###\s*/g, '');
                  return (
                    <h2 key={index} className="text-xl font-bold mt-6 mb-3" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                      {heading}
                    </h2>
                  );
                } else if (paragraph.trim().startsWith('•')) {
                  // This is a list
                  const items = paragraph.split('\n').filter(line => line.trim());
                  return (
                    <ul key={index} className="list-disc pl-6 space-y-2 mb-4">
                      {items.map((item, i) => (
                        <li key={i} className="text-muted-foreground">
                          {item.replace('•', '').trim()}
                        </li>
                      ))}
                    </ul>
                  );
                } else if (paragraph.trim()) {
                  // Regular paragraph
                  return (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph.trim()}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
