import { Button } from '@/components/atoms/button';
import { ButtonGroup } from '@/components/atoms/button-group';
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
import useWindows from '@/hooks/use-windows';
import { topAnime, TopAnimeItem } from '@/lib/actions/ingfokanime/actions';
import { ActionPagination } from '@/lib/actions/type';
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const TopPage = () => {
  const { push } = usePageRouter(),
    { open } = useWindows(),
    { notify } = useNotification(),
    { dict, tr } = useSettings();

  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState<TopAnimeItem[]>([]);
  const [paginate, setPaginate] = useState<ActionPagination>({
    page: 1,
    limit: 20,
  });

  const _getData = async (page = 1) => {
    setIsLoading(true);

    const res = await topAnime(page, paginate.limit);

    if (res.status && res.data) {
      const { items = [], ...data } = res.data;

      setItems(items);
      setPaginate(data);
    } else {
      notify({ type: 'error', title: dict(res.message) });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    _getData();
  }, []);

  return (
    <div className="p-4">
      <h3 className="typo-title-2 mb-4">
        {tr({ en: 'Top Anime', id: 'Anime Teratas' })}
      </h3>

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
                  <ItemTitle className="flex gap-1">
                    <p className="text-primary font-bold">
                      #{item.rank ?? '-'}
                    </p>
                    <p className="line-clamp-1">
                      {item.title ??
                        item.title_english ??
                        item.title_japanese ??
                        '-'}
                    </p>
                  </ItemTitle>
                  <ItemDescription>
                    {item.favorites ?? 0} favorites
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ButtonGroup>
                    <Button
                      variant={'tinted'}
                      onClick={() => push(`detail/${item.mal_id}`)}
                    >
                      {dict('get')}
                    </Button>
                    <Button
                      variant={'tinted'}
                      onClick={() =>
                        open('INGFOKANIME', `detail/${item.mal_id}`)
                      }
                      size={'icon'}
                    >
                      <ArrowUpRightIcon />
                    </Button>
                  </ButtonGroup>
                </ItemActions>
              </Item>
            ))}
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button
          variant="outline"
          disabled={isLoading || paginate.page <= 1}
          onClick={() => _getData(paginate.page - 1)}
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
          onClick={() => _getData(paginate.page + 1)}
          size={'icon'}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default TopPage;
