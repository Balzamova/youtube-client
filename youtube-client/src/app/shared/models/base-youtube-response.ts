import { SearchYoutubeKind } from './search-youtube-kind';

export interface BaseYoutubeResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number
  };
  nextPageToken: string;
  regionCode: string;
  items: SearchYoutubeKind[];
}
