export type Anime = {
  id: string;
  name: string;
  type?: string;
  episodes?: string[];
  episodesCount?: number;
};

export type EpisodeSource = {
  provider: string;
  source: string;
};
