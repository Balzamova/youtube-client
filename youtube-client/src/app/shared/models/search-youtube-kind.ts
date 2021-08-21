import { KindYoutubeVideo } from './kind-youtube-video';
import { Thumbnails } from './thumbnails';

export interface SearchYoutubeKind {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string
  };
  thumbnails?: {
    default: Thumbnails;
    medium: Thumbnails;
    high: Thumbnails;
    standard: Thumbnails;
    maxres: Thumbnails;
  };
  title?: string;
}
