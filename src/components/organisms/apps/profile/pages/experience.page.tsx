import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/atoms/item';
import { Timeline, TimelineItem } from '@/components/atoms/timeline';
import ExperienceData from '@/data/experience.data';
import useSettings from '@/hooks/use-settings';
import WindowsStore from '@/stores/windows.store';
import { extractMarkdownText } from '@/utils/string';
import { LinkIcon } from 'lucide-react';

const ExperiencePage = () => {
  const { open } = WindowsStore();
  const { dict, tr } = useSettings();

  return (
    <div className="p-4">
      <Timeline>
        {ExperienceData.map((data, i) => (
          <TimelineItem
            key={i}
            range={data.range}
            title={data.role}
            subtitle={`${dict('at')} ${data.company.name}`}
          >
            <div className="flex flex-wrap gap-2">
              {data.company.link && (
                <Item variant={'outline'} asChild>
                  <a href={data.company.link} target="_blank">
                    <ItemMedia>
                      <LinkIcon size={16} />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{data.company.link}</ItemTitle>
                    </ItemContent>
                  </a>
                </Item>
              )}
              {data.note && (
                <Item key={i} variant={'outline'} className="w-full" asChild>
                  <a
                    href="#"
                    onClick={() => open('NOTES', `detail/${data.note?.id}`)}
                  >
                    <ItemContent>
                      <ItemHeader>{data.note.title}</ItemHeader>
                      <ItemDescription>
                        {extractMarkdownText(tr(data.note.content))}
                      </ItemDescription>
                    </ItemContent>
                  </a>
                </Item>
              )}
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default ExperiencePage;
