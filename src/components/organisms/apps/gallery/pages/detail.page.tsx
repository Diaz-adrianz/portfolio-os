import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemHeader,
} from '@/components/atoms/item';
import MediaData from '@/data/media.data';
import useSettings from '@/hooks/use-settings';
import { MoreVerticalIcon } from 'lucide-react';

const DetailPage = ({ id }: { id: string }) => {
  const { setWallpaper, dict } = useSettings();
  const media = MediaData.find((d) => d.id == id);

  return (
    <div>
      {media && (
        <>
          <Item>
            <ItemContent>
              <ItemHeader>{media.title}</ItemHeader>
            </ItemContent>
            <ItemActions>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size={'icon'}>
                    <MoreVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setWallpaper(media.src)}>
                    {dict('setAsWallpaper')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ItemActions>
          </Item>
          <div className="relative mb-4 w-full">
            {media?.type == 'image' && (
              <img
                src={media.src}
                alt=""
                className="size-full object-contain"
              />
            )}
          </div>

          <div className="mb-8 flex flex-wrap gap-4 p-4">
            {media.attribute && (
              <div className="min-w-60 flex-1">
                <small className="typo-small text-muted-foreground block">
                  Attribution
                </small>
                <Button variant={'link'} asChild className="p-0">
                  <a href={media.attribute.link} target="_blank">
                    {media.attribute.label}
                  </a>
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
