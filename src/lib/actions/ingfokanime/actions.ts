'use server';

import { errorResponseAction } from '@/lib/server/error-response';
import { rateLimitAction } from '@/lib/server/rate-limit';
import axios from 'axios';
import { Anime, AnimeFull, Pagination } from './type';
import { ActionPaginationResponse, ActionResponse } from '../type';

export type SearchAnimeItem = Pick<
  Anime,
  'mal_id' | 'images' | 'title' | 'title_english' | 'title_japanese' | 'genres'
>;

async function searchAnime(
  q: string,
  page = 1,
  limit = 10
): Promise<ActionResponse<ActionPaginationResponse<SearchAnimeItem> | null>> {
  try {
    await rateLimitAction({ key: 'ingfokanime.searchAnime', limit: 12 });

    const { data } = await axios.get<{ pagination: Pagination; data: Anime[] }>(
      `${process.env.INGFOKANIME_API}/anime?q=${q}&page=${page}&limit=${limit}`
    );

    return {
      status: true,
      message: 'Success',
      data: {
        items: data.data.map((d) => ({
          mal_id: d.mal_id,
          images: d.images,
          title: d.title,
          title_english: d.title_english,
          title_japanese: d.title_japanese,
          genres: d.genres,
        })),
        page: data.pagination.current_page,
        limit: data.pagination.items.per_page,
        totalItems: data.pagination.items.total,
        totalPages: Math.ceil(
          data.pagination.items.total / data.pagination.items.per_page
        ),
      },
    };
  } catch (err) {
    return errorResponseAction(err);
  }
}

export type TopAnimeItem = Pick<
  Anime,
  | 'mal_id'
  | 'images'
  | 'title'
  | 'title_english'
  | 'title_japanese'
  | 'rank'
  | 'favorites'
>;

async function topAnime(
  page = 1,
  limit = 10
): Promise<ActionResponse<ActionPaginationResponse<TopAnimeItem> | null>> {
  try {
    await rateLimitAction({ key: 'ingfokanime.topAnime', limit: 12 });

    const { data } = await axios.get<{ pagination: Pagination; data: Anime[] }>(
      `${process.env.INGFOKANIME_API}/top/anime?page=${page}&limit=${limit}`
    );

    return {
      status: true,
      message: 'Success',
      data: {
        items: data.data.map((d) => ({
          mal_id: d.mal_id,
          images: d.images,
          title: d.title,
          title_english: d.title_english,
          title_japanese: d.title_japanese,
          rank: d.rank,
          favorites: d.favorites,
        })),
        page: data.pagination.current_page,
        limit: data.pagination.items.per_page,
        totalItems: data.pagination.items.total,
        totalPages: Math.ceil(
          data.pagination.items.total / data.pagination.items.per_page
        ),
      },
    };
  } catch (err) {
    return errorResponseAction(err);
  }
}

export type SchedulesAnimeItem = Pick<
  Anime,
  | 'mal_id'
  | 'images'
  | 'title'
  | 'title_english'
  | 'title_japanese'
  | 'broadcast'
>;

async function schedulesAnime(
  day: string,
  page = 1,
  limit = 10
): Promise<
  ActionResponse<ActionPaginationResponse<SchedulesAnimeItem> | null>
> {
  try {
    await rateLimitAction({ key: 'ingfokanime.schedulesAnime', limit: 12 });

    const { data } = await axios.get<{ pagination: Pagination; data: Anime[] }>(
      `${process.env.INGFOKANIME_API}/schedules?filter=${day}&page=${page}&limit=${limit}`
    );

    return {
      status: true,
      message: 'Success',
      data: {
        items: data.data.map((d) => ({
          mal_id: d.mal_id,
          images: d.images,
          title: d.title,
          title_english: d.title_english,
          title_japanese: d.title_japanese,
          broadcast: d.broadcast,
        })),
        page: data.pagination.current_page,
        limit: data.pagination.items.per_page,
        totalItems: data.pagination.items.total,
        totalPages: Math.ceil(
          data.pagination.items.total / data.pagination.items.per_page
        ),
      },
    };
  } catch (err) {
    return errorResponseAction(err);
  }
}

export type DetailAnime = AnimeFull;

async function detailAnime(
  id: string
): Promise<ActionResponse<DetailAnime | null>> {
  try {
    await rateLimitAction({ key: 'ingfokanime.detailAnime', limit: 12 });

    const { data } = await axios.get<{ data: AnimeFull }>(
      `${process.env.INGFOKANIME_API}/anime/${id}/full`
    );

    return {
      status: true,
      message: 'Success',
      data: data.data,
    };
  } catch (err) {
    return errorResponseAction(err);
  }
}

export { searchAnime, topAnime, schedulesAnime, detailAnime };
