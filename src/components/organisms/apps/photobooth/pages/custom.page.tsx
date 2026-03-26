import { AspectRatio } from '@/components/atoms/aspect-ratio';
import { PHOTO_RATIO, PHOTOS_COUNT, usePhotoboothContext } from '../view';

const CustomPage = () => {
  const { photos } = usePhotoboothContext();

  return (
    <div className="p-4">
      {photos.length == PHOTOS_COUNT && (
        <>
          <div className="flex flex-wrap gap-4">
            {/* photostrip */}
            <div className="bg-background flex max-w-40 grow flex-col gap-4 p-4">
              {photos.map((item, i) => (
                <AspectRatio key={i} className="w-full" ratio={PHOTO_RATIO}>
                  <img src={item} alt="" className="size-full object-cover" />
                </AspectRatio>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomPage;
