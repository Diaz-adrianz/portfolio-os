import { Button } from '@/components/atoms/button';
import { InputSearch } from '@/components/atoms/input';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/atoms/item';
import { Skeleton } from '@/components/atoms/skeleton';
import { usePageRouter } from '@/components/molecules/page-router';
import useNotification from '@/hooks/use-notiification';
import useSettings from '@/hooks/use-settings';
import {
  searchAnime,
  SearchAnimeItem,
} from '@/lib/actions/ingfokanime/actions';
import { ActionPagination } from '@/lib/actions/type';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';

const IndexPage = () => {
  const { push } = usePageRouter(),
    { notify } = useNotification(),
    { dict, tr } = useSettings();

  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const [items, setItems] = useState<SearchAnimeItem[]>([]);
  const [paginate, setPaginate] = useState<ActionPagination>({
    page: 1,
    limit: 20,
  });

  const _getData = async (q: string, page = 1) => {
    setIsLoading(true);

    const res = await searchAnime(q, page, paginate.limit);

    if (res.status && res.data) {
      const { items = [], ...data } = res.data;

      setItems(items);
      setPaginate(data);
    } else {
      notify({ type: 'error', title: dict(res.message) });
    }

    setIsLoading(false);
  };

  return (
    <div className="p-4">
      <h3 className="typo-title-2 mb-4">
        {tr({ en: 'Search Anime', id: 'Pencarian Anime' })}
      </h3>

      <div className="mb-4">
        <InputSearch
          onEnter={(v) => {
            setQuery(v);
            _getData(v, 1);
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-20 min-w-80 flex-1" />
            ))
          : items.map((item, i) => (
              <Item key={i} className="min-w-80 flex-1">
                <ItemMedia variant="image" className="relative">
                  <img
                    src={
                      item.images?.webp?.image_url ??
                      item.images?.jpg?.image_url ??
                      ''
                    }
                    alt=""
                    className="size-full object-cover"
                  />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    {item.title ??
                      item.title_english ??
                      item.title_japanese ??
                      '-'}
                  </ItemTitle>
                  <ItemDescription>
                    {item.genres?.map((genre) => genre.name).join(', ')}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button
                    variant={'tinted'}
                    onClick={() => push(`detail/${item.mal_id}`)}
                  >
                    {dict('get')}
                  </Button>
                </ItemActions>
              </Item>
            ))}
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button
          variant="outline"
          disabled={isLoading || paginate.page <= 1}
          onClick={() => _getData(query, paginate.page - 1)}
          size={'icon'}
        >
          <ChevronLeftIcon />
        </Button>

        <span className="typo-footnote text-muted-foreground">
          {paginate.page} / {paginate.totalPages ?? 1}
        </span>

        <Button
          variant="outline"
          disabled={isLoading || paginate.page >= (paginate.totalPages ?? 1)}
          onClick={() => _getData(query, paginate.page + 1)}
          size={'icon'}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default IndexPage;
