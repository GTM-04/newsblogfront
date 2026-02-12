import { TrustModule } from './TrustModule';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';

interface ArticlePageProps {
  category: string;
  headline: string;
  subheadline: string;
  author: string;
  date: string;
  readTime: string;
  heroImage: string;
  userNeed: 'KNOW' | 'LEARN' | 'FEEL' | 'ACT';
}

export function ArticlePage({
  category,
  headline,
  subheadline,
  author,
  date,
  readTime,
  heroImage,
  userNeed
}: ArticlePageProps) {
  const userNeedColors = {
    KNOW: 'bg-[#B8336A] text-white',
    LEARN: 'bg-[#2E5D8E] text-white',
    FEEL: 'bg-[#8B5A8B] text-white',
    ACT: 'bg-[#D97F4B] text-white'
  };

  return (
    <div className="bg-white">
      {/* Back button */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-4 border-b border-border">
        <button className="flex items-center gap-2 text-sm hover:text-[#B8336A] transition-colors">
          <ArrowLeft className="size-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Article Container */}
      <article className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        <div className="grid lg:grid-cols-[1fr,300px] gap-8">
          {/* Main Content */}
          <div className="max-w-[680px]">
            {/* Category & User Need */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-wider text-[#B8336A] font-semibold">
                {category}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${userNeedColors[userNeed]}`}>
                {userNeed}
              </span>
            </div>

            {/* Headline */}
            <h1 
              className="text-4xl lg:text-5xl mb-4 leading-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {subheadline}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 mb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <User className="size-4" />
                <span>By {author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>{readTime} read</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[16/9] bg-muted overflow-hidden mb-8">
              <img 
                src={heroImage} 
                alt={headline}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body (with drop cap) */}
            <div 
              className="prose prose-lg max-w-none"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {/* Drop cap paragraph */}
              <p className="first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none text-lg leading-relaxed mb-6">
                Sexual wellness is undergoing a quiet revolution. What was once whispered about behind closed doors is now the subject of rigorous scientific inquiry, policy debates, and cultural transformation. Yet despite this progress, misinformation persists, and millions still lack access to accurate, evidence-based information.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Recent research from the National Institute of Health reveals that comprehensive sexual education leads to better health outcomes, stronger relationships, and reduced rates of STIs. The data is clear: knowledge is not just power—it's protection, empowerment, and the foundation for healthy intimacy.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">The Evidence is Clear</h2>

              <p className="text-lg leading-relaxed mb-6">
                Dr. Sarah Mwangi, a leading researcher at the University of Zimbabwe, explains: "We've seen a 40% improvement in communication patterns among couples who engage with evidence-based sexual health resources. This isn't about promoting any particular lifestyle—it's about giving people the tools to make informed decisions."
              </p>

              {/* Pull Quote */}
              <blockquote className="border-l-4 border-[#B8336A] pl-6 my-8 italic text-xl">
                "Sexual wellness isn't a luxury or a taboo—it's a fundamental aspect of human health and dignity. Everyone deserves access to accurate information."
                <cite className="block mt-2 text-base not-italic text-muted-foreground">
                  — Dr. Sarah Mwangi, Sexual Health Researcher
                </cite>
              </blockquote>

              <p className="text-lg leading-relaxed mb-6">
                The research encompasses multiple disciplines: psychology, endocrinology, neuroscience, and public health. What emerges is a holistic picture that challenges old assumptions and validates experiences that were long dismissed or ignored.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">What the Research Tells Us</h2>

              <p className="text-lg leading-relaxed mb-6">
                A meta-analysis of 47 studies involving over 12,000 participants found that:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
                <li>Open communication about sexual health strengthens relationship satisfaction by 35%</li>
                <li>Access to comprehensive sex education reduces unintended pregnancies by 60%</li>
                <li>Addressing sexual wellness improves overall mental health outcomes</li>
                <li>Representation in sexual health resources increases engagement among marginalized communities</li>
              </ul>

              <p className="text-lg leading-relaxed mb-6">
                These findings aren't just statistics—they represent real lives, real relationships, and real transformations. They point to a future where sexual wellness is treated with the same seriousness and compassion as any other aspect of health.
              </p>
            </div>

            {/* Trust Module */}
            <TrustModule 
              studyCount={47}
              expertInterviews={[
                "Dr. Sarah Mwangi, Sexual Health Researcher, University of Zimbabwe",
                "Dr. James Moyo, Clinical Psychologist & Relationship Therapist",
                "Prof. Tendai Ndlovu, Public Health Specialist"
              ]}
              confidence="High"
              sources={[
                "National Institute of Health (2024) - Comprehensive Sexual Education Outcomes",
                "Journal of Sexual Medicine - Meta-analysis of Communication Patterns",
                "WHO Global Sexual Health Survey 2025"
              ]}
              whatWeDontKnow="While the evidence for comprehensive sexual education is strong, we still need more longitudinal studies tracking outcomes over 10+ years, and more research specifically focused on LGBTQ+ populations in Sub-Saharan Africa."
            />

            {/* Related Stories */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: "'Lora', serif" }}>
                Related Stories
              </h3>
              <div className="space-y-4">
                {[
                  {
                    category: 'Research',
                    title: 'New study reveals link between communication and relationship longevity',
                    time: '8 min read'
                  },
                  {
                    category: 'Mental Health',
                    title: 'Understanding the connection between sexual wellness and anxiety',
                    time: '6 min read'
                  },
                  {
                    category: 'Identity',
                    title: 'LGBTQ+ inclusive sexual health: Why representation matters',
                    time: '10 min read'
                  }
                ].map((story, index) => (
                  <a 
                    key={index}
                    href="#"
                    className="block group hover:bg-[#f9f9f9] p-4 -mx-4 transition-colors"
                  >
                    <span className="text-xs uppercase tracking-wider text-[#B8336A] font-semibold">
                      {story.category}
                    </span>
                    <h4 className="text-lg mt-1 group-hover:text-[#B8336A] transition-colors" style={{ fontFamily: "'Lora', serif" }}>
                      {story.title}
                    </h4>
                    <span className="text-sm text-muted-foreground">{story.time}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (Desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              {/* More on this topic */}
              <div className="border border-border p-4 bg-[#f9f9f9]">
                <h4 className="font-semibold mb-4">More on this topic</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="#" className="hover:text-[#B8336A] transition-colors">
                      The science of intimacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#B8336A] transition-colors">
                      Communication guides for couples
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#B8336A] transition-colors">
                      Mental health and relationships
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="border border-border p-4 bg-white">
                <h4 className="font-semibold mb-2">Stay Informed</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Weekly research updates delivered to your inbox
                </p>
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="w-full px-3 py-2 border border-border mb-2 text-sm"
                />
                <button className="w-full px-4 py-2 bg-[#B8336A] text-white hover:bg-[#9a2a58] transition-colors text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
