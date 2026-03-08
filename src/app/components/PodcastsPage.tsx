import { ArrowLeft, Calendar, Clock, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPodcasts, type Podcast } from '../../api/podcasts';
import { ensureHttps } from '../../utils/imageUtils';
import { Card } from './ui/card';


interface PodcastsPageProps {
  onBack: () => void;
}

export function PodcastsPage({ onBack }: PodcastsPageProps) {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  // Track play count increment per podcast
  const [playCounted, setPlayCounted] = useState<{ [slug: string]: boolean }>({});

  const handlePlayPodcast = async (podcast: any) => {
    // Stop current audio if playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // If clicking the same podcast, just stop
    if (playingId === podcast.id) {
      setPlayingId(null);
      setCurrentAudio(null);
      return;
    }

    // Check if podcast has audio file
    if (!podcast.audio_file) {
      alert('Audio file not available for this podcast.');
      return;
    }

    // Increment play count one-time per play session
    if (podcast.slug && !playCounted[podcast.slug]) {
      fetch(`/api/podcasts/${podcast.slug}/increment_play/`, { method: 'POST' });
      setPlayCounted(prev => ({ ...prev, [podcast.slug]: true }));
    }

    // Create and play new audio
    const audio = new Audio(ensureHttps(podcast.audio_file));
    let hasAlreadyCounted = false;
    audio.addEventListener('play', () => {
      if (hasAlreadyCounted) return;
      hasAlreadyCounted = true;
      if (podcast.slug) {
        fetch(`/api/podcasts/${podcast.slug}/increment_play/`, { method: 'POST' });
      }
    }, { once: true });
    
    try {
      await audio.play();
      audio.onended = () => {
        setPlayingId(null);
        setCurrentAudio(null);
      };
      
      setCurrentAudio(audio);
      setPlayingId(podcast.id);
    } catch (error) {
      console.error('Failed to play audio:', error);
      alert('Unable to play audio. Please try again.');
    }
  };

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await getPodcasts({ page_size: 20, ordering: '-created_at' });
        setPodcasts(response.results);
      } catch (error) {
        console.error('Failed to fetch podcasts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const mockPodcasts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Let's Talk: Conversations About Intimacy",
      host: "Dr. Tendai Moyo",
      episode: "Episode 12: Navigating Consent in Modern Relationships",
      description: "Join Dr. Moyo as she discusses the importance of clear communication and mutual respect in intimate partnerships with guests from Harare.",
      duration: "45 min",
      date: "Feb 12, 2026",
      category: "Relationships"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Wellness Wednesday",
      host: "Chipo Ndlovu & Tafara Chikwanha",
      episode: "Episode 24: Sexual Health Myths Debunked",
      description: "Our hosts separate fact from fiction, addressing common misconceptions about sexual health prevalent in Zimbabwean communities.",
      duration: "38 min",
      date: "Feb 10, 2026",
      category: "Health & Wellness"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Youth Voices Zimbabwe",
      host: "Rutendo Makoni",
      episode: "Episode 8: First Time Conversations",
      description: "Young Zimbabweans share their experiences and questions about navigating intimacy for the first time in a safe, respectful manner.",
      duration: "52 min",
      date: "Feb 8, 2026",
      category: "Youth Perspectives"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "The Science of Love",
      host: "Prof. Farai Musariri",
      episode: "Episode 15: The Biology of Attraction",
      description: "A deep dive into the scientific research behind attraction, desire, and long-term bonding with insights from University of Zimbabwe studies.",
      duration: "41 min",
      date: "Feb 5, 2026",
      category: "Science"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Queer Perspectives ZW",
      host: "Simba Nyathi",
      episode: "Episode 6: Safe Spaces and Self-Expression",
      description: "Exploring LGBTQ+ experiences in Zimbabwe, discussing identity, relationships, and finding supportive communities.",
      duration: "48 min",
      date: "Feb 3, 2026",
      category: "Identity"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1598966739654-5e9fd24c0c84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Mind & Body Connection",
      host: "Nyasha Sibanda, Therapist",
      episode: "Episode 19: Trauma-Informed Intimacy",
      description: "Understanding how past experiences affect present relationships and healing approaches available in Zimbabwe's mental health landscape.",
      duration: "55 min",
      date: "Jan 31, 2026",
      category: "Mental Health"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8336A] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading podcasts...</p>
        </div>
      </div>
    );
  }

  const displayPodcasts = podcasts.length > 0 ? podcasts : mockPodcasts;

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
            Podcasts
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Listen to expert conversations, personal stories, and insightful discussions about sexual health, relationships, and wellness in Zimbabwe.
          </p>
        </div>
      </div>

      {/* Podcasts Grid */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayPodcasts.map((podcast) => (
            <Card key={podcast.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="md:w-48 md:flex-shrink-0">
                  <div className="aspect-square rounded-lg overflow-hidden relative group">
                    {(podcast as any).cover_image || (podcast as any).image ? (
                      <img 
                        src={ensureHttps((podcast as any).cover_image || (podcast as any).image)} 
                        alt={podcast.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#B8336A] to-[#8B5A8B] flex items-center justify-center">
                        <Play className="size-12 text-white" />
                      </div>
                    )}
                    {/* Play button overlay - always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity touch-none">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPodcast(podcast);
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handlePlayPodcast(podcast);
                        }}
                        className="bg-white rounded-full p-4 hover:scale-110 active:scale-95 transition-transform touch-manipulation"
                        aria-label={playingId === podcast.id ? 'Pause podcast' : 'Play podcast'}
                      >
                        {playingId === podcast.id ? (
                          <div className="size-6 text-[#B8336A] flex items-center justify-center">
                            <div className="flex gap-1">
                              <div className="w-1 h-4 bg-[#B8336A] animate-pulse"></div>
                              <div className="w-1 h-4 bg-[#B8336A] animate-pulse" style={{animationDelay: '0.2s'}}></div>
                              <div className="w-1 h-4 bg-[#B8336A] animate-pulse" style={{animationDelay: '0.4s'}}></div>
                            </div>
                          </div>
                        ) : (
                          <Play className="size-6 text-[#B8336A] fill-current" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-[#B8336A] uppercase tracking-wide">
                      {(podcast as any).tags?.[0] || (podcast as any).category || 'Podcast'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {podcast.title}
                  </h3>
                  {(podcast as any).episode_number && (
                    <h4 className="text-md font-semibold mb-3">
                      Episode {(podcast as any).episode_number}
                    </h4>
                  )}
                  {(podcast as any).episode && (
                    <h4 className="text-md font-semibold mb-3">
                      {(podcast as any).episode}
                    </h4>
                  )}
                  <p className="text-sm text-muted-foreground mb-4">
                    {podcast.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      <span>{(podcast as any).duration_seconds ? Math.floor((podcast as any).duration_seconds / 60) + ' min' : (podcast as any).duration || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      <span>{(podcast as any).created_at ? new Date((podcast as any).created_at).toLocaleDateString() : (podcast as any).date || ''}</span>
                    </div>
                    <span>{(podcast as any).view_count ?? 0} plays</span>
                                      <span>{(podcast as any).view_count ?? 0} views</span>
                                      {typeof (podcast as any).play_count === 'number' && (
                                        <span>{(podcast as any).play_count} plays</span>
                                      )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
