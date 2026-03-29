import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { Skeleton } from '@/components/atoms/skeleton';
import useNotification from '@/hooks/use-notiification';
import useSettings from '@/hooks/use-settings';
import {
  detailAnime,
  DetailAnimeItem,
  EpisodeSourceItem,
  episodeSourcesAnime,
  resolveSourceAnime,
} from '@/lib/actions/tontonanime/actions';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const StreamPage = ({ id }: { id: string }) => {
  const { notify } = useNotification(),
    { dict } = useSettings();

  const [isLoading, setIsLoading] = useState(false);

  const [anime, setAnime] = useState<DetailAnimeItem>();
  const [episode, setEpisode] = useState('');

  const [sources, setSources] = useState<EpisodeSourceItem[]>([]),
    [source, setSource] = useState('');

  const [url, setUrl] = useState('');

  const _getAnime = async () => {
    setIsLoading(true);

    const res = await detailAnime(id);

    if (res.status && res.data) {
      setAnime(res.data);
    } else {
      notify({ type: 'error', title: dict(res.message) });
    }

    setIsLoading(false);
  };

  const _getSources = async () => {
    setSources([]);
    setUrl('');
    if (!episode) return;

    setIsLoading(true);

    const res = await episodeSourcesAnime(id, episode);

    if (res.status && res.data) {
      setSources(res.data);
      setSource(res.data.at(0)?.source ?? '');
    } else {
      notify({ type: 'error', title: dict(res.message) });
    }

    setIsLoading(false);
  };

  const _getUrl = async () => {
    setUrl('');
    if (!source) return;

    setIsLoading(true);

    const res = await resolveSourceAnime(source);

    if (res.status && res.data) {
      setUrl(res.data ?? '');
    } else {
      notify({ type: 'error', title: dict(res.message) });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    _getAnime();
  }, [id]);

  useEffect(() => {
    _getSources();
  }, [id, episode]);

  useEffect(() => {
    _getUrl();
  }, [source]);

  return (
    <div className="p-4">
      {isLoading ? (
        <>
          <Skeleton className="mb-4 h-8 w-1/2" />
          <Skeleton className="mb-4 h-8 w-1/8" />
          <Skeleton className="aspect-video w-full" />
        </>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="typo-title-2 mb-4">{anime?.name ?? '-'}</h3>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <Select value={episode} onValueChange={setEpisode}>
              <SelectTrigger>
                <SelectValue placeholder={'Episode'} />
              </SelectTrigger>
              <SelectContent>
                {anime?.episodes?.map((item, i) => (
                  <SelectItem key={i} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={source}
              onValueChange={setSource}
              disabled={!sources.length}
            >
              <SelectTrigger>
                <SelectValue placeholder={'Source'} />
              </SelectTrigger>
              <SelectContent>
                {sources?.map((item, i) => (
                  <SelectItem key={i} value={item.source}>
                    {item.provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-background/40 w-full overflow-hidden rounded-xl">
            <div className="mx-auto aspect-video w-full max-w-6xl overflow-hidden">
              {url && (
                <ReactPlayer
                  src={'/api/tontonanime/proxy?url=' + url}
                  controls
                  width="100%"
                  height="100%"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StreamPage;
