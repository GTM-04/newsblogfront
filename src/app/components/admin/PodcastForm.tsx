import { AlertCircle, ArrowLeft, Check, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPodcast, getPodcast, updatePodcast, type Podcast, type PodcastCreateData } from '../../../api/podcasts';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface PodcastFormProps {
  podcastSlug?: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function PodcastForm({ podcastSlug, onBack, onSuccess }: PodcastFormProps) {
  const [formData, setFormData] = useState<Partial<PodcastCreateData>>({
    title: '',
    description: '',
    episode_number: 1,
    duration_seconds: 0,
    transcript: '',
    tags: [],
    is_featured: false,
  });
  const [tagInput, setTagInput] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPodcast, setLoadingPodcast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Load podcast data if editing
  useEffect(() => {
    if (podcastSlug) {
      setLoadingPodcast(true);
      getPodcast(podcastSlug)
        .then((podcast: Podcast) => {
          setFormData({
            title: podcast.title,
            description: podcast.description,
            episode_number: podcast.episode_number,
            duration_seconds: podcast.duration_seconds,
            transcript: podcast.transcript,
            tags: podcast.tags,
            is_featured: podcast.is_featured,
          });
        })
        .catch((err) => {
          setError('Failed to load podcast data');
          console.error(err);
        })
        .finally(() => {
          setLoadingPodcast(false);
        });
    }
  }, [podcastSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      if (podcastSlug) {
        // Update existing podcast
        const updateData: any = { ...formData };
        if (audioFile) {
          updateData.audio_file = audioFile;
        }
        if (thumbnailFile) {
          updateData.thumbnail = thumbnailFile;
        }
        await updatePodcast(podcastSlug, updateData);
      } else {
        // Create new podcast
        const submitData: PodcastCreateData = {
          ...formData as PodcastCreateData,
          audio_file: audioFile || undefined,
          thumbnail: thumbnailFile || undefined,
        };
        await createPodcast(submitData);
      }
      
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || `Failed to ${podcastSlug ? 'update' : 'create'} podcast. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t: string) => t !== tag) || [],
    });
  };

  const handleDurationChange = (minutes: number) => {
    setFormData({
      ...formData,
      duration_seconds: minutes * 60,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {loadingPodcast ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8336A] mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading podcast...</p>
          </div>
        </div>
      ) : (
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            {podcastSlug ? 'Edit Podcast' : 'Create New Podcast'}
          </h1>

          {success && (
            <Alert className="mb-6 border-green-500 bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                Podcast {podcastSlug ? 'updated' : 'created'} successfully! Redirecting...
              </AlertDescription>
            </Alert>
          )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Episode Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Episode 1: Introduction to..."
              required
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Episode description..."
              rows={4}
              required
              disabled={loading}
            />
          </div>

          {/* Row: Episode Number & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Episode Number <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={formData.episode_number}
                onChange={(e) => setFormData({ ...formData, episode_number: parseInt(e.target.value) || 1 })}
                min="1"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Duration (minutes) <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={Math.round((formData.duration_seconds || 0) / 60)}
                onChange={(e) => handleDurationChange(parseInt(e.target.value) || 0)}
                min="0"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Audio File */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Audio File <span className="text-red-500">*</span>
            </label>
            <Input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
              required
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground mt-1">MP3, M4A, WAV (Max 50MB)</p>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP (Max 10MB)</p>
          </div>

          {/* Transcript */}
          <div>
            <label className="block text-sm font-medium mb-2">Transcript (Optional)</label>
            <Textarea
              value={formData.transcript}
              onChange={(e) => setFormData({ ...formData, transcript: e.target.value })}
              placeholder="Full transcript of the episode..."
              rows={8}
              disabled={loading}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag"
                disabled={loading}
              />
              <Button type="button" onClick={addTag} disabled={loading}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-500"
                    disabled={loading}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Featured Checkbox */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                disabled={loading}
              />
              <span className="text-sm">Featured Podcast</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="bg-[#B8336A] hover:bg-[#9a2a58]"
              disabled={loading}
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? (podcastSlug ? 'Updating...' : 'Creating...') : (podcastSlug ? 'Update Podcast' : 'Create Podcast')}
            </Button>
            <Button type="button" variant="outline" onClick={onBack} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
        </Card>
      )}
    </div>
  );
}
