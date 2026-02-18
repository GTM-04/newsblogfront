import { ArrowLeft, Eye, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getVideos, type Video } from '../../api/videos';
import { ensureHttps } from '../../utils/imageUtils';
import { Card } from './ui/card';

interface VideoPageProps {
  onBack: () => void;
}

export function VideoPage({ onBack }: VideoPageProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos({ page_size: 20, ordering: '-created_at' });
        setVideos(response.results);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const mockVideos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Understanding Consent: A Guide for Young Adults",
      description: "This educational video explores the importance of clear, enthusiastic consent in all intimate interactions, featuring perspectives from Zimbabwean youth.",
      duration: "12:34",
      views: "24.5K",
      date: "1 week ago",
      category: "Education"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "STI Prevention: What Every Zimbabwean Should Know",
      description: "Medical professionals from Harare Central Hospital provide essential information about sexually transmitted infections and prevention methods.",
      duration: "15:42",
      views: "31.2K",
      date: "2 weeks ago",
      category: "Health"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Communication Skills for Better Relationships",
      description: "Relationship counselor Dr. Tendai Moyo demonstrates practical communication techniques that strengthen partnerships.",
      duration: "18:15",
      views: "19.8K",
      date: "3 weeks ago",
      category: "Relationships"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Breaking Stigma: Mental Health and Intimacy",
      description: "A candid discussion about how mental health affects sexual wellness, featuring testimonials from young Zimbabweans.",
      duration: "22:18",
      views: "16.4K",
      date: "1 month ago",
      category: "Mental Health"
    },
    {
      id: 5,
      thumbnail: "https://images.unsplash.com/photo-1571844307991-2f06e3f0d548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "LGBTQ+ Voices: Love and Acceptance in Zimbabwe",
      description: "Personal stories from Zimbabwe's LGBTQ+ community about finding love, acceptance, and building healthy relationships.",
      duration: "25:47",
      views: "22.1K",
      date: "1 month ago",
      category: "Identity"
    },
    {
      id: 6,
      thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "The Science of Attraction: Research Insights",
      description: "University of Zimbabwe researchers explain the biological and psychological factors that influence human attraction and bonding.",
      duration: "20:33",
      views: "28.7K",
      date: "1 month ago",
      category: "Research"
    },
    {
      id: 7,
      thumbnail: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Contraception Options: Making Informed Choices",
      description: "A comprehensive guide to family planning methods available in Zimbabwe, presented by reproductive health specialists.",
      duration: "17:26",
      views: "35.9K",
      date: "2 months ago",
      category: "Health"
    },
    {
      id: 8,
      thumbnail: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Healthy Relationships: Red Flags to Watch For",
      description: "Learn to identify warning signs of unhealthy relationships and discover resources available for support in Zimbabwe.",
      duration: "14:52",
      views: "41.3K",
      date: "2 months ago",
      category: "Relationships"
    },
    {
      id: 9,
      thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Teen Talk: Navigating First Relationships",
      description: "Age-appropriate guidance for teenagers experiencing their first romantic relationships, featuring youth counselors from Bulawayo.",
      duration: "16:08",
      views: "18.6K",
      date: "2 months ago",
      category: "Youth"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8336A] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading videos...</p>
        </div>
      </div>
    );
  }

  const displayVideos = videos.length > 0 ? videos : mockVideos;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-[#B8336A]/5 to-transparent">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Video Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Watch educational videos, expert interviews, and documentary content about sexual health, relationships, and wellness in Zimbabwe.
          </p>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative aspect-video overflow-hidden group">
                {(video as any).thumbnail ? (
                  <img 
                    src={ensureHttps((video as any).thumbnail)} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#B8336A] to-[#8B5A8B] flex items-center justify-center">
                    <Play className="size-16 text-white" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white rounded-full p-4 hover:scale-110 transition-transform">
                    <Play className="size-8 text-[#B8336A] fill-current ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {(video as any).duration_seconds ? `${Math.floor((video as any).duration_seconds / 60)}:${String((video as any).duration_seconds % 60).padStart(2, '0')}` : (video as any).duration || 'N/A'}
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs font-semibold text-[#B8336A] uppercase tracking-wide">
                    {(video as any).tags?.[0] || (video as any).category || 'Video'}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="size-3" />
                    <span>{(video as any).view_count !== undefined ? (video as any).view_count + ' views' : (video as any).views || '0 views'}</span>
                  </div>
                  <span>•</span>
                  <span>{(video as any).created_at ? new Date((video as any).created_at).toLocaleDateString() : (video as any).date || ''}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
