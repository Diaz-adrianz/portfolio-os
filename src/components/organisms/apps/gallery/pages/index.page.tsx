import { usePageRouter } from '@/components/molecules/page-router';
import MediaData from '@/data/media.data';
import Image from 'next/image';

const IndexPage = () => {
  const { push } = usePageRouter();

  return (
    <div className="flex flex-wrap gap-1">
      {MediaData.map((item, i) => (
        <button
          key={i}
          onClick={() => push(`detail/${item.id}`)}
          className="group focus-visible:outline-primary relative aspect-square min-w-40 flex-1 cursor-pointer overflow-hidden transition-transform duration-200 hover:scale-[1.02] focus-visible:scale-[1.02] focus-visible:outline-4"
        >
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/50 group-focus-visible:bg-black/50" />

          {item.type === 'image' && (
            <Image
              src={item.src}
              loading="lazy"
              alt=""
              fill
              sizes="100%"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default IndexPage;
