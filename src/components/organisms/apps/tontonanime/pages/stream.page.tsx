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

const StreamPage = ({ id }: { id: string }) => {
  const { notify } = useNotification(),
    { dict } = useSettings();

  const [isLoading, setIsLoading] = useState(false);

  const [anime, setAnime] = useState<DetailAnimeItem>();
  const [episode, setEpisode] = useState('');

  const [sources, setSources] = useState<EpisodeSourceItem[]>([]),
    [source, setSource] = useState('');

  const [link, setLink] = useState('');

  const _getAnime = async (id: string) => {
    setIsLoading(true);

    const res = await detailAnime(id);

    if (res.status && res.data) {
      setAnime(res.data);
    } else {
      notify({ type: 'error', title: dict(res.message) });
    }

    setIsLoading(false);
  };

  const _getSources = async (id: string, episode: string) => {
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

  const _getLink = async (source: string) => {
    setIsLoading(true);

    const res = await resolveSourceAnime(source);

    if (res.status && res.data) {
      setLink(res.data ?? '');
    } else {
      notify({ type: 'error', title: dict(res.message) });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    _getAnime(id);
  }, [id]);

  useEffect(() => {
    if (episode) _getSources(id, episode);
  }, [id, episode]);

  useEffect(() => {
    if (source) _getLink(source);
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

          <p>{link}</p>
        </>
      )}
    </div>
  );
};

export default StreamPage;
