import { AspectRatio } from '@/components/atoms/aspect-ratio';
import { PHOTO_RATIO, PHOTOS_COUNT, usePhotoboothContext } from '../view';
import { CSSProperties, useMemo, useRef, useState } from 'react';
import { getRandomInt } from '@/utils/number';
import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  HeartIcon,
  LucideIcon,
  PaletteIcon,
  PartyPopperIcon,
  Settings2Icon,
  ShuffleIcon,
  SmilePlusIcon,
  Trash2Icon,
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
import { motion } from 'motion/react';

type Sticker = {
  src: string;
  init?: { x?: number; y?: number; rotate?: number };
};

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

const presets: Option<string, { icon: LucideIcon }>[] = [
  {
    value: 'love',
    label: { en: 'Love', id: 'Cinta' },
    meta: { icon: HeartIcon },
  },
  {
    value: 'Party',
    label: { en: 'Party', id: 'Pesta' },
    meta: { icon: PartyPopperIcon },
  },
];

const CustomPage = () => {
  const { tr } = useSettings(),
    { notify } = useNotification(),
    { photos } = usePhotoboothContext();

  const date = new Date();

  const containerRef = useRef<HTMLDivElement>(null),
    stripRef = useRef<HTMLDivElement>(null),
    trashRef = useRef<HTMLDivElement>(null),
    colorInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const _backgrounds: Option<
    string,
    { foreground?: string; background?: string }
  >[] = useMemo(
    () =>
      MediaData.filter((m) => m.tags?.includes('photobooth-background')).map(
        (m) => ({
          value: m.src,
          label: { en: m.title, id: m.title },
          meta: {
            foreground: m.meta?.foreground,
            background: m.meta?.background,
          },
        })
      ),
    []
  );

  const _stickers: Option[] = useMemo(
    () =>
      MediaData.filter((m) => m.tags?.includes('photobooth-sticker')).map(
        (m) => ({ value: m.src, label: { en: m.title, id: m.title } })
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
    [stickers, setStickers] = useState<Sticker[]>([]),
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

  const _deleteSticker = (src: string, info: any) => {
    const trash = trashRef.current?.getBoundingClientRect();
    const point = info.point;

    if (!trash) return;

    const isInsideTrash =
      point.x > trash.left &&
      point.x < trash.right &&
      point.y > trash.top &&
      point.y < trash.bottom;

    if (isInsideTrash) {
      setStickers((prev) => prev.filter((s) => s.src !== src));
    }
  };

  const _filterStickers = (titles: string[]) => {
    return _stickers
      .filter((s) => titles.includes(s.label.en))
      .reduce<Record<string, (typeof _stickers)[0]>>((a, c) => {
        a[c.label.en] = c;
        return a;
      }, {});
  };

  const _setPreset = (key: string) => {
    const stickers: Sticker[] = [];

    if (key == 'love') {
      setBackground(_backgrounds.find((b) => b.label.en == 'Red')?.value);
      setShape('heart');

      const stickersMap = _filterStickers(['XOXO', 'Love You', 'Kiss']);

      if (stickersMap['Love You'])
        stickers.push({
          src: stickersMap['Love You'].value,
          init: { x: 7, y: 60, rotate: 15 },
        });
      if (stickersMap['XOXO'])
        stickers.push({
          src: stickersMap['XOXO'].value,
          init: { x: 95, y: 155, rotate: -20 },
        });
      if (stickersMap['Kiss'])
        stickers.push({
          src: stickersMap['Kiss'].value,
          init: { x: 25, y: 345, rotate: 10 },
        });
    } else if (key == 'Party') {
      setBackground(_backgrounds.find((b) => b.label.en == 'Rainbow')?.value);
      setShape('squircle');

      const stickersMap = _filterStickers([
        'Lets Party',
        'Bunting',
        'Confetti',
      ]);

      if (stickersMap['Lets Party'])
        stickers.push({
          src: stickersMap['Lets Party'].value,
          init: { x: 95, y: 350, rotate: -30 },
        });
      if (stickersMap['Confetti'])
        stickers.push({
          src: stickersMap['Confetti'].value,
          init: { x: 5, y: 165, rotate: 0 },
        });
      if (stickersMap['Bunting'])
        stickers.push({
          src: stickersMap['Bunting'].value,
          init: { x: 100, y: -15, rotate: 40 },
        });
    }
    setStickers(stickers);
  };

  return (
    <div className="p-4">
      {photos.length == PHOTOS_COUNT && (
        <>
          <div className="flex gap-4">
            <div
              ref={containerRef}
              className="bg-background dark:bg-background/40 relative grow overflow-x-auto rounded-xl p-4"
            >
              {loading && <LoadingOverlay />}

              {/* Photostrip */}
              <div className="mx-auto w-full max-w-40 min-w-40">
                <AspectRatio
                  ref={stripRef}
                  ratio={10.5 / 29.7}
                  className="flex flex-col"
                  style={{
                    backgroundColor: color,
                  }}
                >
                  {/* Stickers overlay decoration */}
                  {stickers.map((item, i) => (
                    <motion.img
                      key={item.src + i}
                      src={item.src}
                      animate={{
                        top: item.init?.y,
                        left: item.init?.x,
                        rotate: item.init?.rotate,
                      }}
                      transition={{ duration: 0 }}
                      drag
                      dragConstraints={containerRef}
                      dragElastic={0.2}
                      onDragEnd={(e, info) => _deleteSticker(item.src, info)}
                      className="absolute z-10 h-16 w-16 cursor-grab active:cursor-grabbing"
                    />
                  ))}

                  {/* Background Image */}
                  {background && (
                    <div className="absolute top-0 left-0 size-full overflow-hidden">
                      <img
                        src={background}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>
                  )}

                  {/* Photos */}
                  <div className="flex w-full flex-col gap-2 px-5 pt-3 pb-2">
                    {photos.map((item, i) => (
                      <AspectRatio
                        key={i}
                        className="w-full"
                        ratio={PHOTO_RATIO}
                      >
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
                  </div>

                  {/* Marker */}
                  <div
                    className="relative mt-auto grid gap-px px-3 py-2 text-center"
                    style={{
                      color:
                        _background?.meta?.foreground ??
                        getContrastColor(color),
                      backgroundColor: _background?.meta?.background,
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

              {/* Trash Area for Overlay Decoration  */}
              <div
                ref={trashRef}
                className="bg-destructive/20 text-destructive absolute top-0 left-0 flex items-center justify-center rounded-br-full p-2 pr-4 pb-4"
              >
                <Trash2Icon size={14} />
              </div>
            </div>

            <div className="flex max-w-36 grow flex-col gap-2 overflow-hidden">
              {/* Preset  */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'outline'}>
                    <Settings2Icon /> Preset
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {presets.map((item, i) => (
                    <DropdownMenuItem
                      key={i}
                      onClick={() => _setPreset(item.value)}
                    >
                      {item.meta?.icon && <item.meta.icon />} {tr(item.label)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator className="my-2" />

              {/* Background color */}
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

              {/* Background image */}
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

              {/* Photo shape */}
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

              {/* Add Sticker */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'outline'}>
                    <SmilePlusIcon /> Add sticker
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {_stickers.map((item, i) => (
                    <DropdownMenuItem
                      key={i}
                      onClick={() =>
                        setStickers((prev) => [...prev, { src: item.value }])
                      }
                    >
                      {tr(item.label)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator className="my-2" />

              {/* Messy Photos (rotate and translate a bit)*/}
              <Button
                variant={withMessy ? 'outline' : 'ghost'}
                onClick={() => setWithMessy((s) => !s)}
              >
                <ShuffleIcon /> Messy
              </Button>

              {/* Add date below marker */}
              <Button
                variant={withDate ? 'outline' : 'ghost'}
                onClick={() => setWithDate((s) => !s)}
              >
                <CalendarIcon /> Add date
              </Button>

              {/* Add time below marker */}
              <Button
                variant={withTime ? 'outline' : 'ghost'}
                onClick={() => setWithTime((s) => !s)}
              >
                <ClockIcon /> Add time
              </Button>

              <Separator className="my-2" />

              {/* Download / Export */}
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
