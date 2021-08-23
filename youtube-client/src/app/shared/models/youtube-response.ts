import { KindYoutubeVideo } from './kind-youtube-video';

export interface YoutubeResponse {
  kind: string,
  etag: string,
  pageInfo: {
    "totalResults": number,
    "resultsPerPage": number
  },
  items: KindYoutubeVideo[]
}
