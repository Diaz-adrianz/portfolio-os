import { Button } from '@/components/atoms/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/atoms/carousel';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
} from '@/components/atoms/item';
import WorkData from '@/data/work.data';
import useSettings from '@/hooks/use-settings';
import useWindows from '@/hooks/use-windows';
import { formatTime } from '@/utils/date';
import { extractMarkdownText } from '@/utils/string';
import Autoplay from 'embla-carousel-autoplay';

const DetailPage = ({ id }: { id: string }) => {
  const { tr, dict } = useSettings();
  const work = WorkData.find((d) => d.id == id);

  const { open } = useWindows();

  return (
    <div>
      {work && (
        <>
          {(work.media?.length ?? 0) > 0 && (
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
              <CarouselContent>
                {work.media?.map((item, i) => (
                  <CarouselItem key={i} className="h-40">
                    <img
                      src={item.src}
                      alt=""
                      className="h-full w-full object-cover object-center"
                      onClick={() => open('GALLERY', `detail/${item.id}`)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}

          <div className="mt-4 flex flex-wrap justify-between gap-4 px-4">
            <div className="grid gap-1">
              <h3 className="typo-title-1">{work.name}</h3>
              <p className="typo-body text-muted-foreground">{work.category}</p>
            </div>
            <small className="typo-caption-1 text-primary uppercase">
              {formatTime(work.date?.since, 'MMM YYYY')} -{' '}
              {work.date?.until
                ? formatTime(work.date?.until, 'MMM YYYY')
                : work.date?.since
                  ? dict('now')
                  : ''}
            </small>
          </div>

          <p className="typo-body mt-4 px-4">{tr(work.caption)}</p>

          {(work.links?.length ?? 0) > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 px-4">
              {work.links?.map((item, i) => (
                <Button key={i} variant={'link'} asChild>
                  <a href={item.link} target="_blank">
                    <item.icon /> {item.label}
                  </a>
                </Button>
              ))}
            </div>
          )}

          {(work.notes?.length ?? 0) > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 px-4">
              {work.notes?.map((item, i) => (
                <Item
                  key={i}
                  variant={'outline'}
                  className="min-w-60 flex-1"
                  asChild
                >
                  <a
                    href="#"
                    onClick={() => open('NOTES', `detail/${item.id}`)}
                  >
                    <ItemContent>
                      <ItemHeader>{item.title}</ItemHeader>
                      <ItemDescription>
                        {extractMarkdownText(tr(item.content))}
                      </ItemDescription>
                    </ItemContent>
                  </a>
                </Item>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailPage;
