import { ArrowLeft } from 'lucide-react';
import { Card } from './ui/card';

interface NewsPageProps {
  onBack: () => void;
}

export function NewsPage({ onBack }: NewsPageProps) {
  const newsArticles = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1523367395443-e52540b43884?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      category: "Health & Wellness",
      title: "New Sexual Health Clinic Opens in Harare's Avondale Suburb",
      excerpt: "The state-of-the-art facility offers comprehensive reproductive health services, counseling, and free STI testing for young people across Zimbabwe.",
      date: "February 10, 2026",
      readTime: "5 min read"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1596992803598-2bb4e73dabb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      category: "Education",
      title: "Zimbabwe Ministry of Education Launches Comprehensive Sex Education Program",
      excerpt: "A groundbreaking curriculum will be introduced in secondary schools nationwide, focusing on consent, healthy relationships, and reproductive rights.",
      date: "February 8, 2026",
      readTime: "7 min read"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      category: "Research",
      title: "University of Zimbabwe Study Reveals Communication Key to Relationship Success",
      excerpt: "Research involving 1,500 couples across Harare, Bulawayo, and Mutare shows that weekly check-ins improve relationship satisfaction by 45%.",
      date: "February 5, 2026",
      readTime: "6 min read"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1571844307991-2f06e3f0d548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      category: "Community",
      title: "Bulawayo Youth Launch LGBTQ+ Support Network",
      excerpt: "A new community-led initiative provides safe spaces, mental health support, and sexual health resources for LGBTQ+ youth in Zimbabwe.",
      date: "February 3, 2026",
      readTime: "4 min read"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      category: "Policy",
      title: "Parliament Debates New Reproductive Health Rights Bill",
      excerpt: "Lawmakers discuss comprehensive legislation aimed at improving access to contraception and family planning services across all provinces.",
      date: "January 30, 2026",
      readTime: "8 min read"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      category: "Mental Health",
      title: "Breaking Taboos: Mental Health and Sexual Wellness in Zimbabwe",
      excerpt: "Psychologists in Harare are pioneering new approaches to address the intersection of mental health and intimate relationships.",
      date: "January 28, 2026",
      readTime: "6 min read"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      category: "Innovation",
      title: "Zimbabwe Tech Startup Develops Anonymous Sexual Health Consultation App",
      excerpt: "The app connects users with certified healthcare professionals for confidential advice on sexual and reproductive health matters.",
      date: "January 25, 2026",
      readTime: "5 min read"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      category: "Culture",
      title: "Traditional Leaders Join Campaign for Healthy Relationship Practices",
      excerpt: "Community chiefs across rural Zimbabwe partner with health organizations to promote consent and communication in relationships.",
      date: "January 22, 2026",
      readTime: "7 min read"
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#B8336A] uppercase tracking-wide">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                  <button className="text-sm font-semibold text-[#B8336A] hover:underline">
                    Read More
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
