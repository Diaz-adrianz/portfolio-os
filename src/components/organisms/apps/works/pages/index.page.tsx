import { Button } from '@/components/atoms/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/atoms/item';
import { usePageRouter } from '@/components/molecules/page-router';
import WorkData, { WorkCategories } from '@/data/work.data';
import useSettings from '@/hooks/use-settings';
import { sortArray } from '@/utils/array';
import Image from 'next/image';
import { useState } from 'react';

const IndexPage = () => {
  const { dict, tr } = useSettings();
  const { push } = usePageRouter();
  const [cat, setCat] = useState('all');

  const items = sortArray(WorkData, 'date.since', 'desc');

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Button
          variant={'all' == cat ? 'default' : 'outline'}
          onClick={() => setCat('all')}
        >
          {dict('all')}
        </Button>
        {Array.from(WorkCategories).map((item, i) => (
          <Button
            key={i}
            variant={item == cat ? 'default' : 'outline'}
            onClick={() => setCat(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {items
          .filter((item) => item.category == cat || cat == 'all')
          .map((item, i) => (
            <Item key={i} className="min-w-80 flex-1">
              <ItemMedia variant="image" className="relative">
                <Image
                  src={item.media?.at(0)?.src ?? ''}
                  alt=""
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{item.name}</ItemTitle>
                <ItemDescription>{tr(item.caption)}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant={'tinted'}
                  onClick={() => push(`detail/${item.id}`)}
                >
                  {dict('get')}
                </Button>
              </ItemActions>
            </Item>
          ))}
      </div>
    </div>
  );
};

export default IndexPage;
