import { BaseCard } from '@shared/models/base-card';

export interface AdminCard extends BaseCard {
  description: string;
  videoUrl: string;
}
