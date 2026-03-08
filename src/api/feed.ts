import apiClient from './client';

export interface FeedResponse {
  latest_articles: any[];
  editor_picks: any[];
  popular_articles: any[];
  latest_podcasts: any[];
  latest_videos: any[];
}

export const getHomepageFeed = async (limit: number = 10): Promise<FeedResponse> => {
  const { data } = await apiClient.get<FeedResponse>(`/api/homepage/feed/?limit=${limit}`);
  return data;
};
