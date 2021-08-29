import { BaseCard } from '@shared/models/base-card';

export interface UserCard extends BaseCard {
  id: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  commentCount: string;
}
