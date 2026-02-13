import { PaginatedResponse } from './articles';
import apiClient from './client';

export interface Video {
  id: number;
  title: string;
  slug: string;
  description: string;
  video_file?: string;
  external_url?: string;
  thumbnail?: string;
  duration_seconds: number;
  tags: string[];
  related_articles: number[];
  author: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  is_featured: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface VideoCreateData {
  title: string;
  slug?: string;
  description: string;
  external_url?: string;
  duration_seconds: number;
  tags: string[];
  related_articles?: number[];
  is_featured?: boolean;
  video_file?: File;
  thumbnail?: File;
}

export const getVideos = async (filters?: Record<string, any>): Promise<PaginatedResponse<Video>> => {
  const { data } = await apiClient.get<PaginatedResponse<Video>>('/api/videos/', { params: filters });
  return data;
};

export const getVideo = async (slug: string): Promise<Video> => {
  const { data } = await apiClient.get<Video>(`/api/videos/${slug}/`);
  return data;
};

export const createVideo = async (videoData: VideoCreateData): Promise<Video> => {
  const formData = new FormData();
  
  Object.entries(videoData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'tags') {
        (value as string[]).forEach(tag => formData.append('tags', tag));
      } else if (key === 'related_articles') {
        (value as number[]).forEach(id => formData.append('related_articles', id.toString()));
      } else if ((key === 'video_file' || key === 'thumbnail') && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  const { data } = await apiClient.post<Video>('/api/videos/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const updateVideo = async (slug: string, videoData: Partial<VideoCreateData>): Promise<Video> => {
  const { data } = await apiClient.patch<Video>(`/api/videos/${slug}/`, videoData);
  return data;
};

export const deleteVideo = async (slug: string): Promise<void> => {
  await apiClient.delete(`/api/videos/${slug}/`);
};
