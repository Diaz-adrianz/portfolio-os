export type Pagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
};

export type AnimeFull = Anime & {
  relations?: {
    relation: string;
    entry: {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }[];
  }[];
  theme?: {
    openings?: string[];
    endings?: string[];
  };
  external?: {
    name: string;
    url: string;
  }[];
  streaming?: {
    name: string;
    url: string;
  }[];
};

export type Anime = {
  mal_id: number;
  url: string;

  images: {
    jpg: ImageSet;
    webp: ImageSet;
  };

  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
    images: {
      image_url: string | null;
      small_image_url: string | null;
      medium_image_url: string | null;
      large_image_url: string | null;
      maximum_image_url: string | null;
    };
  };

  approved: boolean;

  titles: {
    type: string;
    title: string;
  }[];

  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];

  type: string;
  source: string;

  episodes: number | null;
  status: string;
  airing: boolean;

  aired: {
    from: string | null;
    to: string | null;
    prop: {
      from: DateProp;
      to: DateProp;
    };
    string: string;
  };

  duration: string;
  rating: string;

  score: number | null;
  scored_by: number;
  rank: number | null;
  popularity: number;
  members: number;
  favorites: number;

  synopsis: string | null;
  background: string | null;

  season: string | null;
  year: number | null;

  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };

  producers: Producer[];
  licensors: Producer[];
  studios: Producer[];

  genres: Genre[];
  explicit_genres: Genre[];
  themes: Genre[];
  demographics: Genre[];
};

export type ImageSet = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

export type DateProp = {
  day: number | null;
  month: number | null;
  year: number | null;
};

export type Producer = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export type Genre = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};
