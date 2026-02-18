import apiClient from './client';

export interface Article {
  id: number;
  title: string;
  slug: string;
  subtitle?: string;
  summary: string;
  body_content?: string;
  hero_image?: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  tags: string[];
  author: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  content_type: string;
  status: string;
  is_editor_pick: boolean;
  is_paywalled: boolean;
  confidence_rating?: string;
  sources_count?: number;
  experts_interviewed?: number;
  view_count: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleCreateData {
  title: string;
  slug?: string;
  subtitle?: string;
  summary: string;
  body: string;
  category: number;
  tags: string[];
  content_type: string;
  status: string;
  is_editor_pick?: boolean;
  is_paywalled?: boolean;
  sources_count?: number;
  experts_interviewed?: number;
  confidence_rating?: string;
  hero_image?: File;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const getArticles = async (filters?: Record<string, any>): Promise<PaginatedResponse<Article>> => {
  const { data } = await apiClient.get<PaginatedResponse<Article>>('/api/articles/', { params: filters });
  return data;
};

export const getArticle = async (slug: string): Promise<Article> => {
  const { data } = await apiClient.get<Article>(`/api/articles/${slug}/`);
  return data;
};

export const createArticle = async (articleData: ArticleCreateData): Promise<Article> => {
  const formData = new FormData();
  
  Object.entries(articleData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'tags') {
        formData.append('tags', JSON.stringify(value));
      } else if (key === 'hero_image' && value instanceof File) {
        formData.append('hero_image', value);
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  const { data } = await apiClient.post<Article>('/api/articles/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const updateArticle = async (slug: string, articleData: Partial<ArticleCreateData>): Promise<Article> => {
  const formData = new FormData();
  
  Object.entries(articleData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'tags') {
        formData.append('tags', JSON.stringify(value));
      } else if (key === 'hero_image' && value instanceof File) {
        formData.append('hero_image', value);
      } else if (!(value instanceof File)) {
        formData.append(key, value.toString());
      }
    }
  });

  const { data } = await apiClient.patch<Article>(`/api/articles/${slug}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deleteArticle = async (slug: string): Promise<void> => {
  await apiClient.delete(`/api/articles/${slug}/`);
};

export const incrementArticleView = async (slug: string): Promise<Article> => {
  const { data } = await apiClient.post<Article>(`/api/articles/${slug}/increment_view/`);
  return data;
};
