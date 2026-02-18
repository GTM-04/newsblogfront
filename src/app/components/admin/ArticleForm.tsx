import { AlertCircle, ArrowLeft, Check, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createArticle, getArticle, updateArticle, type Article, type ArticleCreateData } from '../../../api/articles';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface ArticleFormProps {
  articleSlug?: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function ArticleForm({ articleSlug, onBack, onSuccess }: ArticleFormProps) {
  const [formData, setFormData] = useState<Partial<ArticleCreateData>>({
    title: '',
    summary: '',
    body: '',
    category: 1,
    tags: [],
    content_type: 'NEWS',
    status: 'DRAFT',
    is_editor_pick: false,
    is_paywalled: false,
    sources_count: 0,
    confidence_rating: 'MEDIUM',
  });
  const [tagInput, setTagInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Load article data if editing
  useEffect(() => {
    if (articleSlug) {
      setLoadingArticle(true);
      getArticle(articleSlug)
        .then((article: Article) => {
          setFormData({
            title: article.title,
            subtitle: article.subtitle,
            summary: article.summary,
            body: article.body_content || '',
            category: article.category.id,
            tags: article.tags,
            content_type: article.content_type,
            status: article.status,
            is_editor_pick: article.is_editor_pick,
            is_paywalled: article.is_paywalled,
            sources_count: article.sources_count,
            experts_interviewed: article.experts_interviewed,
            confidence_rating: article.confidence_rating,
          });
        })
        .catch((err) => {
          setError('Failed to load article data');
          console.error(err);
        })
        .finally(() => {
          setLoadingArticle(false);
        });
    }
  }, [articleSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      if (articleSlug) {
        // Update existing article
        const updateData: any = { ...formData };
        if (imageFile) {
          updateData.hero_image = imageFile;
        }
        await updateArticle(articleSlug, updateData);
      } else {
        // Create new article
        const submitData: ArticleCreateData = {
          ...formData as ArticleCreateData,
          hero_image: imageFile || undefined,
        };
        await createArticle(submitData);
      }
      
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || `Failed to ${articleSlug ? 'update' : 'create'} article. Please try again.`);
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

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {loadingArticle ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8336A] mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
      ) : (
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            {articleSlug ? 'Edit Article' : 'Create New Article'}
          </h1>

          {success && (
            <Alert className="mb-6 border-green-500 bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                Article {articleSlug ? 'updated' : 'created'} successfully! Redirecting...
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
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter article title"
              required
              disabled={loading}
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Summary <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Brief summary for listings and SEO"
              rows={3}
              required
              disabled={loading}
            />
          </div>

          {/* Body Content */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Article Body <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              placeholder="Full article content..."
              rows={12}
              required
              disabled={loading}
            />
          </div>

          {/* Row: Content Type & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Content Type</label>
              <Select
                value={formData.content_type}
                onValueChange={(value) => setFormData({ ...formData, content_type: value })}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEWS">News</SelectItem>
                  <SelectItem value="RESEARCH">Research</SelectItem>
                  <SelectItem value="ESSAY">Article/Opinion piece</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="REVIEW">Review</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Hero Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Hero Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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

          {/* Row: Sources & Confidence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Sources Count</label>
              <Input
                type="number"
                value={formData.sources_count}
                onChange={(e) => setFormData({ ...formData, sources_count: parseInt(e.target.value) || 0 })}
                min="0"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confidence Rating</label>
              <Select
                value={formData.confidence_rating}
                onValueChange={(value) => setFormData({ ...formData, confidence_rating: value })}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_editor_pick}
                onChange={(e) => setFormData({ ...formData, is_editor_pick: e.target.checked })}
                disabled={loading}
              />
              <span className="text-sm">Editor's Pick</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_paywalled}
                onChange={(e) => setFormData({ ...formData, is_paywalled: e.target.checked })}
                disabled={loading}
              />
              <span className="text-sm">Paywalled</span>
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
              {loading ? (articleSlug ? 'Updating...' : 'Creating...') : (articleSlug ? 'Update Article' : 'Create Article')}
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
