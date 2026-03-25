import { Button } from '@/components/atoms/button';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from '@/components/atoms/item';
import AchievementData from '@/data/achievement.data';
import useWindows from '@/hooks/use-windows';
import { formatTime } from '@/utils/date';
import Image from 'next/image';

const IndexPage = () => {
  const { open } = useWindows();

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {AchievementData.map((item, i) => (
        <Item key={i} className="min-w-60 flex-1">
          <ItemHeader>
            <div
              className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl"
              onClick={() => open('GALLERY', `detail/${item.media.id}`)}
            >
              <Image
                src={item.media.src}
                alt=""
                loading="lazy"
                fill
                sizes="100%"
                className="size-full object-cover transition-transform hover:scale-110"
              />
            </div>
          </ItemHeader>
          <ItemContent>
            <ItemTitle>{item.name.en}</ItemTitle>
            <ItemDescription>
              {formatTime(item.date, 'MMM YYYY')}
            </ItemDescription>
            <div className="flex flex-wrap gap-2">
              {item.links?.map((item, i) => (
                <Button key={i} variant={'link'} asChild>
                  <a href={item.link} target="_blank">
                    <item.icon /> {item.label}
                  </a>
                </Button>
              ))}
            </div>{' '}
          </ItemContent>
        </Item>
      ))}
    </div>
  );
};

export default IndexPage;
