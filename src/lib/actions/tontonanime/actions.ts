'use server';

import { rateLimitAction } from '@/lib/server/rate-limit';
import { ActionResponse } from '../type';
import { errorResponseAction } from '@/lib/server/error-response';
import axios from 'axios';
import { Anime } from './type';
import { getRandomUserAgent } from '@/lib/scraper/header';

export type SearchAnimeItem = Pick<Anime, 'id' | 'name' | 'episodes' | 'type'>;

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
          episodes: e.availableEpisodes['sub'],
          type: e.__typename,
        })) ?? [],
    };
  } catch (err) {
    return errorResponseAction(err);
  }
}

export { searchAnime };
