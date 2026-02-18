import { PaginatedResponse } from './articles';
import apiClient from './client';

export interface Podcast {
  id: number;
  title: string;
  slug: string;
  description: string;
  audio_file?: string;
  thumbnail?: string;
  episode_number: number;
  duration_seconds: number;
  transcript?: string;
  tags: string[];
  related_articles: number[];
  author: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  is_featured: boolean;
  view_count: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PodcastCreateData {
  title: string;
  slug?: string;
  description: string;
  episode_number: number;
  duration_seconds: number;
  transcript?: string;
  tags: string[];
  related_articles?: number[];
  is_featured?: boolean;
  audio_file?: File;
  thumbnail?: File;
}

export const getPodcasts = async (filters?: Record<string, any>): Promise<PaginatedResponse<Podcast>> => {
  const { data } = await apiClient.get<PaginatedResponse<Podcast>>('/api/podcasts/', { params: filters });
  return data;
};

export const getPodcast = async (slug: string): Promise<Podcast> => {
  const { data } = await apiClient.get<Podcast>(`/api/podcasts/${slug}/`);
  return data;
};

export const createPodcast = async (podcastData: PodcastCreateData): Promise<Podcast> => {
  const formData = new FormData();
  
  Object.entries(podcastData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'tags') {
        (value as string[]).forEach(tag => formData.append('tags', tag));
      } else if (key === 'related_articles') {
        (value as number[]).forEach(id => formData.append('related_articles', id.toString()));
      } else if ((key === 'audio_file' || key === 'thumbnail') && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  const { data } = await apiClient.post<Podcast>('/api/podcasts/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const updatePodcast = async (slug: string, podcastData: Partial<PodcastCreateData>): Promise<Podcast> => {
  const { data } = await apiClient.patch<Podcast>(`/api/podcasts/${slug}/`, podcastData);
  return data;
};

export const deletePodcast = async (slug: string): Promise<void> => {
  await apiClient.delete(`/api/podcasts/${slug}/`);
};

export const incrementPodcastView = async (slug: string): Promise<Podcast> => {
  const { data } = await apiClient.post<Podcast>(`/api/podcasts/${slug}/increment_view/`);
  return data;
};
