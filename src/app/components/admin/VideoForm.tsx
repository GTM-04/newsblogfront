import { AlertCircle, ArrowLeft, Check, Save } from 'lucide-react';
import { useState } from 'react';
import { createVideo, type VideoCreateData } from '../../../api/videos';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface VideoFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function VideoForm({ onBack, onSuccess }: VideoFormProps) {
  const [formData, setFormData] = useState<Partial<VideoCreateData>>({
    title: '',
    description: '',
    external_url: '',
    duration_seconds: 0,
    tags: [],
    is_featured: false,
  });
  const [tagInput, setTagInput] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [useExternalUrl, setUseExternalUrl] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      const submitData: VideoCreateData = {
        ...formData as VideoCreateData,
        video_file: !useExternalUrl ? videoFile || undefined : undefined,
        thumbnail: thumbnailFile || undefined,
      };

      await createVideo(submitData);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create video. Please try again.');
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

      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
          Create New Video
        </h1>

        {success && (
          <Alert className="mb-6 border-green-500 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              Video created successfully! Redirecting...
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
              Video Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Understanding Consent: A Guide..."
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
              placeholder="Video description..."
              rows={4}
              required
              disabled={loading}
            />
          </div>

          {/* Duration */}
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

          {/* Video Source Toggle */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={useExternalUrl}
                onChange={(e) => setUseExternalUrl(e.target.checked)}
                disabled={loading}
              />
              <span className="text-sm font-medium">Use External URL (YouTube, Vimeo, etc.)</span>
            </label>

            {useExternalUrl ? (
              <div>
                <label className="block text-sm font-medium mb-2">
                  External Video URL <span className="text-red-500">*</span>
                </label>
                <Input
                  type="url"
                  value={formData.external_url}
                  onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  required
                  disabled={loading}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Video File <span className="text-red-500">*</span>
                </label>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  required
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground mt-1">MP4, WebM (Max 100MB)</p>
              </div>
            )}
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
              <span className="text-sm">Featured Video</span>
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
              {loading ? 'Creating...' : 'Create Video'}
            </Button>
            <Button type="button" variant="outline" onClick={onBack} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
