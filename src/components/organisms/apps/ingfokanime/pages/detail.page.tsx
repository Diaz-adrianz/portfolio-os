import { AspectRatio } from '@/components/atoms/aspect-ratio';
import { Button } from '@/components/atoms/button';
import { Separator } from '@/components/atoms/separator';
import { Skeleton } from '@/components/atoms/skeleton';
import { usePageRouter } from '@/components/molecules/page-router';
import useNotification from '@/hooks/use-notiification';
import useSettings from '@/hooks/use-settings';
import { detailAnime, DetailAnime } from '@/lib/actions/ingfokanime/actions';
import { useEffect, useState } from 'react';

const DetailPage = ({ id }: { id: string }) => {
  const { notify } = useNotification(),
    { push } = usePageRouter(),
    { dict, tr } = useSettings();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<DetailAnime>();

  const _getData = async (id: string) => {
    setIsLoading(true);

    const res = await detailAnime(id);

    if (res.status && res.data) {
      setData(res.data);
    } else {
      notify({ type: 'error', title: dict(res.message) });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    _getData(id);
  }, [id]);

  return (
    <div className="p-4">
      {isLoading && (
        <div className="mb-4 flex flex-wrap">
          <div className="me-4 max-w-28 min-w-28 grow">
            <AspectRatio
              ratio={2 / 3}
              className="w-full overflow-hidden rounded-xl"
            >
              <Skeleton className="size-full" />
            </AspectRatio>
          </div>

          <div className="flex grow flex-col py-4">
            <Skeleton className="mb-2 h-8 w-full" />
            <Skeleton className="mb-4 h-6 w-2/3" />

            <div className="mt-auto flex flex-wrap gap-2">
              <Skeleton className="mb-4 h-8 w-24 rounded-full" />
              <Skeleton className="mb-4 h-8 w-24 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {data && !isLoading && (
        <>
          <div className="mb-4 flex flex-wrap">
            <div className="me-4 max-w-28 min-w-28 grow">
              <AspectRatio
                ratio={2 / 3}
                className="w-full overflow-hidden rounded-xl"
              >
                <img
                  src={
                    data?.images.webp.image_url ??
                    data?.images.jpg.image_url ??
                    ''
                  }
                  alt=""
                  className="size-full object-cover"
                />
              </AspectRatio>
            </div>

            <div className="flex grow flex-col py-4">
              <h3 className="typo-title-2 mb-1">{data?.title}</h3>
              <p className="typo-body text-muted-foreground mb-4">
                {data?.genres?.map((genre) => genre.name).join(', ')}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                <Button asChild>
                  <a href={data?.url ?? ''} target="_blank">
                    MyAnimeList
                  </a>
                </Button>
                <Button variant={'tinted'} asChild>
                  <a
                    href={data?.trailer.url ?? data?.trailer.embed_url ?? ''}
                    target="_blank"
                  >
                    Trailer
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <Separator className="mb-4" />

          <div className="mb-8 flex flex-wrap gap-2">
            <div className="grow px-4 text-center">
              <small className="typo-small text-muted-foreground">Score</small>
              <p className="typo-headline">{data?.score}</p>
            </div>
            <div className="grow px-4 text-center">
              <small className="typo-small text-muted-foreground">Rank</small>
              <p className="typo-headline">#{data?.rank}</p>
            </div>
            <div className="grow px-4 text-center">
              <small className="typo-small text-muted-foreground">
                Popularity
              </small>
              <p className="typo-headline">{data?.popularity}</p>
            </div>
            <div className="grow px-4 text-center">
              <small className="typo-small text-muted-foreground">
                Favorites
              </small>
              <p className="typo-headline">{data?.favorites}</p>
            </div>
          </div>

          <Separator className="mb-4" />

          <div className="mb-4">
            <h6 className="typo-title-3 mb-2">
              {tr({ en: 'Synopsis', id: 'Sinopsis' })}
            </h6>
            <p>{data?.synopsis}</p>
          </div>

          <Separator className="mb-4" />

          <div className="mb-8 flex flex-wrap gap-4">
            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">Type</small>
              <p>{data?.type}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">Source</small>
              <p>{data?.source ?? '-'}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">
                Episodes
              </small>
              <p>{data?.episodes ?? '-'}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">Status</small>
              <p>{data?.status ?? '-'}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">Aired</small>
              <p>{data?.aired?.string ?? '-'}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">
                Duration
              </small>
              <p>{data?.duration ?? '-'}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">Rating</small>
              <p>{data?.rating ?? '-'}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">
                Premiered
              </small>
              <p>{data?.season ? `${data.season} ${data.year ?? ''}` : '-'}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">
                Broadcast
              </small>
              <p>{data?.broadcast.string ?? '-'}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">
                Producers
              </small>
              <p>{data?.producers?.map((p) => p.name).join(', ') ?? '-'}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">
                Licensors
              </small>
              <p>{data?.licensors?.map((l) => l.name).join(', ') ?? '-'}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">
                Studios
              </small>
              <p>{data?.studios?.map((s) => s.name).join(', ') ?? '-'}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">Themes</small>
              <p>{data?.themes?.map((t) => t.name).join(', ') ?? '-'}</p>
            </div>

            <div className="min-w-60 flex-1">
              <small className="typo-small text-muted-foreground">
                Demographic
              </small>
              <p>{data?.demographics?.map((d) => d.name).join(', ') ?? '-'}</p>
            </div>
          </div>

          <Separator className="mb-4" />

          <div className="mb-8">
            {(data?.relations ?? []).map((item, i) => (
              <div key={i} className="mb-4 flex flex-wrap items-center gap-2">
                <h6 className="typo-title-3">{item.relation}</h6>
                {item.entry.map((e, j) =>
                  e.type == 'anime' && e.mal_id ? (
                    <Button
                      key={j}
                      variant={'tinted'}
                      onClick={() => push(`detail/${e.mal_id}`)}
                    >
                      {e.name}
                    </Button>
                  ) : (
                    <Button key={j} variant={'outline'} asChild>
                      <a href={e.url} target="_blank">
                        {e.name}
                      </a>
                    </Button>
                  )
                )}
              </div>
            ))}
          </div>

          <Separator className="mb-4" />

          <div className="mb-4">
            <h6 className="typo-title-3 mb-4">
              {tr({ en: 'Links', id: 'Tautan' })}
            </h6>

            <div className="flex flex-wrap gap-2">
              {data?.external?.map((item, i) => (
                <Button key={i} variant={'outline'} asChild>
                  <a href={item.url} target="_blank">
                    {item.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
