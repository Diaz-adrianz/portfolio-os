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
import { Days } from '@/data/options/day.option';
import useNotification from '@/hooks/use-notiification';
import useSettings from '@/hooks/use-settings';
import useWindows from '@/hooks/use-windows';
import {
  schedulesAnime,
  SchedulesAnimeItem,
} from '@/lib/actions/ingfokanime/actions';
import { ActionPagination } from '@/lib/actions/type';
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';

const SchedulePage = () => {
  const { push } = usePageRouter(),
    { open } = useWindows(),
    { notify } = useNotification(),
    { dict, tr } = useSettings();

  const [isLoading, setIsLoading] = useState(false);
  const [day, setDay] = useState(moment().format('dddd').toLowerCase());

  const [items, setItems] = useState<SchedulesAnimeItem[]>([]);
  const [paginate, setPaginate] = useState<ActionPagination>({
    page: 1,
    limit: 20,
  });

  const _getData = async (day: string, page = 1) => {
    setIsLoading(true);

    const res = await schedulesAnime(day, page, paginate.limit);

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
    _getData(day, 1);
  }, [day]);

  return (
    <div className="p-4">
      <h3 className="typo-title-2 mb-4">
        {tr({ en: 'Schedule Anime', id: 'Jadwal Anime' })}
      </h3>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {Days.map((item, i) => (
          <Button
            key={i}
            variant={item.value == day ? 'default' : 'outline'}
            onClick={() => setDay(item.value)}
          >
            {tr(item.label)}
          </Button>
        ))}
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
                    {item.broadcast.string?.split('at ')?.at(1) ?? '-'}
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
          onClick={() => _getData(day, paginate.page - 1)}
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
          onClick={() => _getData(day, paginate.page + 1)}
          size={'icon'}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default SchedulePage;
