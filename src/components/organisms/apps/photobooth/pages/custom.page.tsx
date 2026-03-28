import { AspectRatio } from '@/components/atoms/aspect-ratio';
import { PHOTO_RATIO, PHOTOS_COUNT, usePhotoboothContext } from '../view';
import { CSSProperties, useMemo, useRef, useState } from 'react';
import { getRandomInt } from '@/utils/number';
import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import { Shape, Shapes } from '@/data/options/shape.option';
import useSettings from '@/hooks/use-settings';
import {
  CalendarIcon,
  ClockIcon,
  DownloadIcon,
  PaletteIcon,
  ShuffleIcon,
  XIcon,
} from 'lucide-react';
import { formatTime } from '@/utils/date';
import { getContrastColor } from '@/utils/string';
import { LoadingOverlay } from '@/components/atoms/loading';
import { toPng } from 'html-to-image';
import useNotification from '@/hooks/use-notiification';
import { Separator } from '@/components/atoms/separator';
import { ButtonGroup } from '@/components/atoms/button-group';
import MediaData from '@/data/media.data';
import { Option } from '@/data/options/option';

const colors = [
  '#ff9999',
  '#ffaa99',
  '#ffcc99',
  '#ffee99',
  '#eeff99',
  '#ccff99',
  '#aaff99',
  '#99ffaa',
  '#99ffcc',
  '#9bf6ff',
  '#a0c4ff',
  '#bdb2ff',
  '#ffc6ff',
  '#fffffc',
  '#d0b8ac',
];

const CustomPage = () => {
  const { tr } = useSettings(),
    { notify } = useNotification(),
    { photos } = usePhotoboothContext();

  const date = new Date();

  const stripRef = useRef<HTMLDivElement>(null),
    colorInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const _backgrounds: Option<string, { foreground?: string }>[] = useMemo(
    () =>
      MediaData.filter((m) => m.tags?.includes('photobooth-background')).map(
        (m) => ({
          value: m.src,
          label: { en: m.title, id: m.title },
          meta: { foreground: m.meta?.foreground },
        })
      ),
    []
  );

  const _offsets = useMemo(
    () =>
      photos.map((_, i) => {
        const isOdd = i % 2 !== 0;
        const translate = Math.random() * 4 + 3;
        const rotate = Math.random() * 4 + 1;
        return {
          transform: `translateX(${isOdd ? -translate : translate}px) rotate(${isOdd ? rotate : -rotate}deg)`,
        };
      }),
    [photos]
  );

  const [color, setColor] = useState(
      colors.at(getRandomInt(0, colors.length - 1)) ?? ''
    ),
    [background, setBackground] = useState<string>(),
    [shape, setShape] = useState<Shape>(
      Shapes.at(getRandomInt(0, Shapes.length - 1))?.value ?? 'square'
    ),
    [withMessy, setWithMessy] = useState(false),
    [withDate, setWithDate] = useState(false),
    [withTime, setWithTime] = useState(false);

  const _shape = Shape[shape],
    _background = _backgrounds.find((b) => b.value == background);

  const _getShapeStyle = (shape: Shape): CSSProperties => {
    if (shape == 'square') return { borderRadius: 0 };
    else if (shape == 'squircle') return { borderRadius: 24 };
    else if (shape == 'circle') return { borderRadius: '100%' };
    else if (shape == 'heart')
      return {
        maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' preserveAspectRatio='none'%3E%3Cpath d='M5 8.5C2 5.8 0 4.2 0 2.5 0 1.1 1.1 0 2.5 0 3.4 0 4.3.5 5 1.4 5.7.5 6.6 0 7.5 0 8.9 0 10 1.1 10 2.5c0 1.7-2 3.3-5 6z'/%3E%3C/svg%3E")`,
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' preserveAspectRatio='none'%3E%3Cpath d='M5 8.5C2 5.8 0 4.2 0 2.5 0 1.1 1.1 0 2.5 0 3.4 0 4.3.5 5 1.4 5.7.5 6.6 0 7.5 0 8.9 0 10 1.1 10 2.5c0 1.7-2 3.3-5 6z'/%3E%3C/svg%3E")`,
        WebkitMaskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        borderRadius: 0,
      };

    return {};
  };

  const _download = async () => {
    if (!stripRef.current) return;
    setLoading(true);

    try {
      const dataUrl = await toPng(stripRef.current, {
        pixelRatio: 3,
      });
      const link = document.createElement('a');
      link.download = 'card.png';
      link.href = dataUrl;
      link.click();
    } catch {
      notify({ type: 'error', title: 'Failed to download image' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {photos.length == PHOTOS_COUNT && (
        <>
          <div className="flex gap-4">
            <div className="bg-background dark:bg-background/40 relative grow overflow-x-auto rounded-xl p-4">
              {loading && <LoadingOverlay />}

              {/* photostrip */}
              <div className="mx-auto w-full max-w-40 min-w-40">
                <AspectRatio
                  ref={stripRef}
                  ratio={10.5 / 29.7}
                  className="flex flex-col gap-2 p-5 pb-3"
                  style={{
                    backgroundColor: color,
                  }}
                >
                  {background && (
                    <div className="absolute top-0 left-0 size-full overflow-hidden">
                      <img
                        src={background}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>
                  )}

                  {photos.map((item, i) => (
                    <AspectRatio key={i} className="w-full" ratio={PHOTO_RATIO}>
                      <img
                        src={item}
                        alt=""
                        className="size-full object-cover"
                        style={{
                          ..._getShapeStyle(shape),
                          ...(withMessy && _offsets.at(i)),
                        }}
                      />
                    </AspectRatio>
                  ))}

                  <div
                    className="relative mt-auto grid gap-px text-center"
                    style={{
                      color:
                        _background?.meta?.foreground ??
                        getContrastColor(color),
                    }}
                  >
                    <p className="typo-footnote-emphasized">Diaz photo</p>
                    <small className="typo-caption-2 opacity-60">
                      {withDate && formatTime(date, 'DD/MM/YYYY')}{' '}
                      {withTime && formatTime(date, 'HH:mm A')}
                    </small>
                  </div>
                </AspectRatio>
              </div>
            </div>

            <div className="flex max-w-36 grow flex-col gap-2 overflow-hidden">
              <ButtonGroup className="relative w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="grow"
                      variant={'outline'}
                      style={{
                        backgroundColor: color,
                        color: getContrastColor(color),
                      }}
                      disabled={!!background}
                    >
                      Color
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52">
                    <DropdownMenuRadioGroup
                      value={color}
                      onValueChange={setColor}
                    >
                      {colors.map((item, i) => (
                        <DropdownMenuRadioItem key={i} value={item}>
                          <div
                            className="h-5 w-full rounded-full"
                            style={{ backgroundColor: item }}
                          ></div>
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size={'icon'}
                  variant={'outline'}
                  onClick={() => colorInputRef.current?.click()}
                  disabled={!!background}
                >
                  <PaletteIcon />
                </Button>
                <input
                  ref={colorInputRef}
                  type="color"
                  className="absolute inset-0 top-0 right-0 h-full w-4 cursor-pointer opacity-0"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </ButtonGroup>

              <ButtonGroup className="relative w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="line-clamp-1 flex-1 text-ellipsis"
                      variant={'outline'}
                    >
                      {tr(_background?.label) || 'Background'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52">
                    <DropdownMenuRadioGroup
                      value={background}
                      onValueChange={setBackground}
                    >
                      {_backgrounds.map((item, i) => (
                        <DropdownMenuRadioItem key={i} value={item.value}>
                          {tr(item.label)}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                {background && (
                  <Button
                    size={'icon'}
                    variant={'outline'}
                    onClick={() => setBackground(undefined)}
                  >
                    <XIcon />
                  </Button>
                )}
              </ButtonGroup>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'outline'}>
                    {_shape.meta?.icon && <_shape.meta.icon />}{' '}
                    {tr(_shape.label)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuRadioGroup
                    value={shape}
                    onValueChange={(v) => setShape(v as Shape)}
                  >
                    {Shapes.map((item, i) => (
                      <DropdownMenuRadioItem key={i} value={item.value}>
                        {item.meta?.icon && <item.meta.icon />} {tr(item.label)}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator className="my-2" />

              <Button
                variant={withMessy ? 'outline' : 'ghost'}
                onClick={() => setWithMessy((s) => !s)}
              >
                <ShuffleIcon /> Messy
              </Button>

              <Button
                variant={withDate ? 'outline' : 'ghost'}
                onClick={() => setWithDate((s) => !s)}
              >
                <CalendarIcon /> Add date
              </Button>

              <Button
                variant={withTime ? 'outline' : 'ghost'}
                onClick={() => setWithTime((s) => !s)}
              >
                <ClockIcon /> Add time
              </Button>

              <Separator className="my-2" />

              <Button onClick={_download}>
                <DownloadIcon /> Download
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomPage;
