import { Button } from '@/components/atoms/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/atoms/carousel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import { Separator } from '@/components/atoms/separator';
import { usePageRouter } from '@/components/molecules/page-router';
import { Option } from '@/data/options/option';
import useSettings from '@/hooks/use-settings';
import {
  CameraIcon,
  RotateCcwIcon,
  SquareCenterlineDashedHorizontalIcon,
  WandSparklesIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { PHOTO_RATIO, PHOTOS_COUNT, usePhotoboothContext } from '../view';
import { AspectRatio } from '@/components/atoms/aspect-ratio';
import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert';

const timerOptions: Option[] = [
  {
    label: { en: '3s', id: '3d' },
    value: '3',
  },
  {
    label: { en: '5s', id: '5d' },
    value: '5',
  },
  {
    label: { en: '7s', id: '7d' },
    value: '7',
  },
];

const IndexPage = () => {
  const { push } = usePageRouter();
  const { tr } = useSettings();
  const { photos, setPhotos } = usePhotoboothContext();

  const webcamRef = useRef<Webcam>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const [cameraAllowed, setCameraAllowed] = useState(true);

  // data
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]),
    [deviceId, setDeviceId] = useState<string>('');

  // settings
  const [mirrored, setMirrored] = useState(false),
    [timer, setTimer] = useState(3);

  const [isTaking, setIsTaking] = useState(false),
    [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((list) => {
      const videoDevices = list.filter((d) => d.kind === 'videoinput');
      setDevices(videoDevices);

      if (videoDevices.length > 0) {
        setDeviceId(videoDevices[0].deviceId);
      }
    });
  }, []);

  const _clearPhotos = () => {
    setPhotos([]);
  };

  const _takePhotos = () => {
    if (isTaking) return;
    setIsTaking(true);
    setPhotos([]);
    let captured = 0;

    const captureNext = () => {
      const doCountdown = (timeLeft: number) => {
        if (timeLeft <= 0) {
          const screenshot = webcamRef.current?.getScreenshot();
          if (screenshot) {
            setPhotos((prev) => [...prev, screenshot]);
          }
          captured += 1;

          if (captured < PHOTOS_COUNT) {
            setTimeout(() => {
              if (carouselApi?.canScrollNext()) carouselApi?.scrollNext();
            }, 200);
            setTimeout(captureNext, 500);
          } else {
            setIsTaking(false);
            setCountdown(null);
          }
          return;
        }

        setCountdown(timeLeft);
        setTimeout(() => doCountdown(timeLeft - 1), 1000);
      };

      doCountdown(timer);
    };

    captureNext();
  };

  return (
    <div className="p-4">
      {!cameraAllowed && (
        <Alert variant={'destructive'} className="mb-4">
          <AlertTitle>
            {tr({ en: 'Camera Access Denied', id: 'Akses Kamera Ditolak' })}
          </AlertTitle>
          <AlertDescription>
            {tr({
              en: 'Please enable camera access in your browser settings to continue.',
              id: 'Mohon aktifkan izin kamera pada pengaturan peramban untuk melanjutkan.',
            })}
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={isTaking}>
              Input
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuRadioGroup
              value={deviceId}
              onValueChange={setDeviceId}
            >
              {devices.map((item, i) => (
                <DropdownMenuRadioItem key={i} value={item.deviceId}>
                  {item.label || 'Camera ' + item.deviceId}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant={mirrored ? 'outline' : 'ghost'}
          onClick={() => setMirrored((s) => !s)}
          disabled={isTaking}
        >
          <SquareCenterlineDashedHorizontalIcon />{' '}
          {tr({ en: 'Mirror', id: 'Cermin' })}
        </Button>

        <Separator orientation="vertical" className="mx-1" />

        {timerOptions.map((item, i) => (
          <Button
            key={i}
            variant={+item.value == timer ? 'outline' : 'ghost'}
            onClick={() => setTimer(+item.value)}
            disabled={isTaking}
          >
            {tr(item.label)}
          </Button>
        ))}

        <div className="grow"></div>

        {!isTaking && photos.length == 0 && cameraAllowed && (
          <Button onClick={_takePhotos}>
            <CameraIcon /> {tr({ en: 'Start', id: 'Mulai' })}
          </Button>
        )}

        {!isTaking && photos.length == PHOTOS_COUNT && (
          <>
            <Button asChild>
              <a href="#" onClick={() => push('custom')}>
                <WandSparklesIcon /> Edit
              </a>
            </Button>
            <Button
              variant={'destructive'}
              onClick={_clearPhotos}
              size={'icon'}
            >
              <RotateCcwIcon />
            </Button>
          </>
        )}
      </div>

      <div className="bg-background dark:bg-background/40 relative rounded-xl px-4">
        {isTaking && (
          <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
            <h3 className="typo-display">{countdown}</h3>
            <p className="typo-body">
              {photos.length + 1}/{PHOTOS_COUNT}
            </p>
          </div>
        )}

        <Carousel setApi={setCarouselApi}>
          <CarouselContent>
            {photos.map((item, i) => (
              <CarouselItem key={i}>
                <div className="mx-auto w-full max-w-3xl px-4">
                  <AspectRatio ratio={PHOTO_RATIO}>
                    <img src={item} alt="" className="size-full object-cover" />
                  </AspectRatio>
                </div>
              </CarouselItem>
            ))}
            {photos.length < PHOTOS_COUNT && (
              <CarouselItem>
                <div className="mx-auto w-full max-w-3xl px-4">
                  <AspectRatio ratio={PHOTO_RATIO}>
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/png"
                      videoConstraints={{
                        deviceId: deviceId ? { exact: deviceId } : undefined,
                      }}
                      mirrored={mirrored}
                      className="size-full object-cover"
                      onUserMediaError={() => {
                        setCameraAllowed(false);
                      }}
                    />
                  </AspectRatio>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselNext className="right-0" />
          <CarouselPrevious className="left-0" />
        </Carousel>
      </div>
    </div>
  );
};

export default IndexPage;
