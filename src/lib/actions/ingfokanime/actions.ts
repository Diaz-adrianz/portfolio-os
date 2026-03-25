'use server';

import { errorResponseAction } from '@/lib/server/error-response';
import { rateLimitAction } from '@/lib/server/rate-limit';
import axios from 'axios';
import { Anime, Pagination } from './type';
import { ActionPaginationResponse, ActionResponse } from '../type';

async function searchAnime(
  q: string,
  page = 1,
  limit = 10
): Promise<ActionResponse<ActionPaginationResponse<Anime> | null>> {
  try {
    await rateLimitAction({ key: 'ingfokanime.searchAnime', limit: 12 });

    const { data } = await axios.get<{ pagination: Pagination; data: Anime[] }>(
      `${process.env.INGFOKANIME_API}/anime?q=${q}&page=${page}&limit=${limit}`
    );

    return {
      status: true,
      message: 'Success',
      data: {
        items: data.data,
        page: data.pagination.current_page,
        limit: data.pagination.items.per_page,
        totalItems: data.pagination.items.total,
        totalPages: Math.floor(
          data.pagination.items.total / data.pagination.items.per_page
        ),
      },
    };
  } catch (err) {
    return errorResponseAction(err);
  }
}

async function topAnime(
  page = 1,
  limit = 10
): Promise<ActionResponse<ActionPaginationResponse<Anime> | null>> {
  try {
    await rateLimitAction({ key: 'ingfokanime.topAnime', limit: 12 });

    const { data } = await axios.get<{ pagination: Pagination; data: Anime[] }>(
      `${process.env.INGFOKANIME_API}/top/anime?page=${page}&limit=${limit}`
    );

    return {
      status: true,
      message: 'Success',
      data: {
        items: data.data,
        page: data.pagination.current_page,
        limit: data.pagination.items.per_page,
        totalItems: data.pagination.items.total,
        totalPages: Math.floor(
          data.pagination.items.total / data.pagination.items.per_page
        ),
      },
    };
  } catch (err) {
    return errorResponseAction(err);
  }
}

export { searchAnime, topAnime };
