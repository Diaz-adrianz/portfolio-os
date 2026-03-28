'use server';

import { rateLimitAction } from '@/lib/server/rate-limit';
import { ActionResponse } from '../type';
import { errorResponseAction } from '@/lib/server/error-response';
import axios from 'axios';
import { Anime, EpisodeSource } from './type';
import { getRandomUserAgent } from '@/lib/scraper/header';
import { decryptSourceUrl } from './utils';
import { isUrl } from '@/utils/string';

export type SearchAnimeItem = Pick<
  Anime,
  'id' | 'name' | 'episodesCount' | 'type'
>;

async function searchAnime(
  q: string,
  page = 1,
  limit = 10
): Promise<ActionResponse<SearchAnimeItem[] | null>> {
  try {
    await rateLimitAction({ key: 'tontonanime.searchAnime', limit: 4 });

    const ua = getRandomUserAgent();
    const { data } = await axios.post<{
      data?: {
        shows?: {
          edges?: {
            _id: string;
            name: string;
            availableEpisodes: Record<string, number>;
            __typename: string;
          }[];
        };
      };
    }>(
      `${process.env.TONTONANIME_API}/api`,
      {
        query: `
      query(
        $search: SearchInput
        $limit: Int
        $page: Int
        $translationType: VaildTranslationTypeEnumType
        $countryOrigin: VaildCountryOriginEnumType
      ) {
        shows(
          search: $search
          limit: $limit
          page: $page
          translationType: $translationType
          countryOrigin: $countryOrigin
        ) {
          edges {
            _id
            name
            availableEpisodes
            __typename
          }
        }
      }
    `,
        variables: {
          search: {
            allowAdult: false,
            allowUnknown: false,
            query: q,
          },
          limit,
          page,
          translationType: 'sub',
          countryOrigin: 'ALL',
        },
      },
      {
        headers: {
          Accept: '*/*',
          'User-Agent': ua,
          Referer: process.env.TONTONANIME_API_REFERER,
        },
      }
    );

    return {
      status: true,
      message: 'Success',
      data:
        data.data?.shows?.edges?.map((e) => ({
          id: e._id,
          name: e.name,
          episodesCount: e.availableEpisodes['sub'],
          type: e.__typename,
        })) ?? [],
    };
  } catch (err) {
    return errorResponseAction(err);
  }
}

export type DetailAnimeItem = Pick<Anime, 'id' | 'name' | 'episodes'>;

async function detailAnime(
  id: string
): Promise<ActionResponse<DetailAnimeItem | null>> {
  try {
    await rateLimitAction({ key: 'tontonanime.detailAnime', limit: 4 });

    const ua = getRandomUserAgent();
    const { data } = await axios.post<{
      data?: {
        show?: {
          _id: string;
          name: string;
          availableEpisodesDetail: Record<string, string[]>;
        };
      };
    }>(
      `${process.env.TONTONANIME_API}/api`,
      {
        query: `
          query ($showId: String!) {
            show(_id: $showId) {
              _id
              name
              availableEpisodesDetail
            }
          }
        `,
        variables: {
          showId: id,
        },
      },
      {
        headers: {
          Accept: '*/*',
          'User-Agent': ua,
          Referer: process.env.TONTONANIME_API_REFERER,
        },
      }
    );

    return {
      status: true,
      message: 'Success',
      data: data.data?.show
        ? {
            id: data.data?.show?._id,
            name: data.data.show.name,
            episodes: data.data.show.availableEpisodesDetail['sub'],
          }
        : null,
    };
  } catch (err) {
    return errorResponseAction(err);
  }
}

export type EpisodeSourceItem = Pick<EpisodeSource, 'provider' | 'source'>;

async function episodeSourcesAnime(
  id: string,
  episode: string
): Promise<ActionResponse<EpisodeSourceItem[] | null>> {
  try {
    await rateLimitAction({ key: 'tontonanime.episodeSourcesAnime', limit: 4 });

    const ua = getRandomUserAgent();
    const { data } = await axios.post<{
      data?: {
        episode?: {
          sourceUrls?: {
            sourceUrl: string;
            priority: number;
            sourceName: string;
            type: string;
          }[];
        };
      };
    }>(
      `${process.env.TONTONANIME_API}/api`,
      {
        query: `
        query ($showId: String!, $translationType: VaildTranslationTypeEnumType!, $episodeString: String!) {
            episode(
                showId: $showId
                translationType: $translationType
                episodeString: $episodeString
            ) {
                episodeString
                sourceUrls
            }
        }
        `,
        variables: {
          showId: id,
          translationType: 'sub',
          episodeString: episode,
        },
      },
      {
        headers: {
          Accept: '*/*',
          'User-Agent': ua,
          Referer: process.env.TONTONANIME_API_REFERER,
        },
      }
    );

    const items = data.data?.episode?.sourceUrls
      ?.filter((su) => su.sourceUrl.startsWith('--'))
      .sort((a, b) => b.priority - a.priority)
      .map((su) => ({
        provider: su.sourceName,
        source: su.sourceUrl,
      }));

    return {
      status: true,
      message: 'Success',
      data: items ?? [],
    };
  } catch (err) {
    return errorResponseAction(err);
  }
}

async function resolveSourceAnime(
  source: string
): Promise<ActionResponse<string | null>> {
  try {
    await rateLimitAction({ key: 'tontonanime.resolveSourceAnime', limit: 4 });

    let url = decryptSourceUrl(source);

    if (!isUrl(url)) {
      const ua = getRandomUserAgent();
      const { data } = await axios.get<{
        links: {
          link: string;
          mp4: boolean;
        }[];
      }>(`${process.env.TONTONANIME_API?.replace('api.', '')}${url}`, {
        headers: {
          Accept: '*/*',
          'User-Agent': ua,
          Referer: process.env.TONTONANIME_API_REFERER,
        },
      });

      const link = data.links.find((l) => l.mp4);
      if (link) url = link.link;
    }

    if (!isUrl(url)) throw new Error();

    return {
      status: true,
      message: 'Success',
      data: url,
    };
  } catch (err) {
    return errorResponseAction(err);
  }
}

export { searchAnime, detailAnime, episodeSourcesAnime, resolveSourceAnime };
