import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import MediaData from '@/data/media.data';
import useSettings from '@/hooks/use-settings';
import { MoreVerticalIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const DetailPage = ({ id }: { id: string }) => {
  const { setWallpaper, dict } = useSettings();
  const media = MediaData.find((d) => d.id == id);

  return (
    <div className="p-4">
      {media && (
        <>
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="grid">
              <h3 className="typo-title-2">{media.title}</h3>
              {media.attribute && (
                <Button variant={'link'} asChild className="justify-start p-0">
                  <a href={media.attribute.link} target="_blank">
                    {media.attribute.label}
                  </a>
                </Button>
              )}
            </div>

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
          </div>

          <div className="bg-background/40 relative flex w-full justify-center overflow-hidden rounded-xl">
            {media?.type === 'image' && (
              <TransformWrapper
                minScale={0.8}
                initialScale={1}
                wheel={{ disabled: true }}
                pinch={{ step: 5 }}
              >
                {({ zoomIn, zoomOut }) => (
                  <>
                    <TransformComponent wrapperClass="!w-full !h-full">
                      <img
                        src={media.src}
                        alt={media.title}
                        className="h-full w-full object-contain"
                      />
                    </TransformComponent>

                    {/* Controls */}
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Button
                        onClick={() => zoomIn()}
                        size={'icon'}
                        variant={'secondary'}
                      >
                        <ZoomInIcon />
                      </Button>
                      <Button
                        onClick={() => zoomOut()}
                        size={'icon'}
                        variant={'secondary'}
                      >
                        <ZoomOutIcon />
                      </Button>
                    </div>
                  </>
                )}
              </TransformWrapper>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
