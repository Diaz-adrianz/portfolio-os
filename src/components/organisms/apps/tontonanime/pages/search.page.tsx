import { IlusVideos } from '@/assets/images';
import { Button } from '@/components/atoms/button';
import { ButtonGroup } from '@/components/atoms/button-group';
import { InputSearch } from '@/components/atoms/input';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/atoms/item';
import { Skeleton } from '@/components/atoms/skeleton';
import { usePageRouter } from '@/components/molecules/page-router';
import useNotification from '@/hooks/use-notiification';
import useSettings from '@/hooks/use-settings';
import useWindows from '@/hooks/use-windows';
import {
  searchAnime,
  SearchAnimeItem,
} from '@/lib/actions/tontonanime/actions';
import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { tontonanimeApp } from '../app';

const welcomeDescription = {
  en: 'Explore and stream your favorite anime series',
  id: 'Jelajahi dan tonton serial anime favorit Kamu',
};

const SearchPage = () => {
  const { push } = usePageRouter(),
    { open } = useWindows(),
    { notify } = useNotification(),
    { dict, tr } = useSettings();

  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState<SearchAnimeItem[]>([]);

  const _getData = async (q: string, page = 1) => {
    setIsLoading(true);

    const res = await searchAnime(q, page, 20);

    if (res.status && res.data) {
      setItems(res.data);
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
            _getData(v, 1);
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 min-w-80 flex-1" />
          ))
        ) : items.length ? (
          items.map((item, i) => (
            <Item key={i} className="min-w-80 flex-1">
              <ItemContent>
                <ItemTitle>{item.name ?? '-'}</ItemTitle>
                <ItemDescription>
                  {item.episodesCount ?? 0} episodes
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <ButtonGroup>
                  <Button
                    variant={'tinted'}
                    onClick={() => push(`stream/${item.id}`)}
                  >
                    {dict('play')}
                  </Button>
                  <Button
                    variant={'tinted'}
                    onClick={() => open('TONTONANIME', `stream/${item.id}`)}
                    size={'icon'}
                  >
                    <ArrowUpRightIcon />
                  </Button>
                </ButtonGroup>
              </ItemActions>
            </Item>
          ))
        ) : (
          <div className="m-auto flex flex-col items-center justify-center px-4 py-16 text-center">
            <Image
              src={IlusVideos}
              alt=""
              width={160}
              height={160}
              className="m-auto mb-8"
            />
            <p className="typo-headline mb-1">
              {dict('welcomeTo', { name: tr(tontonanimeApp.title) })}
            </p>
            <p className="typo-footnote text-muted-foreground">
              {tr(welcomeDescription)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
