import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/atoms/item';
import { Timeline, TimelineItem } from '@/components/atoms/timeline';
import EducationData from '@/data/education.data';
import useSettings from '@/hooks/use-settings';

const EducationPage = () => {
  const { tr } = useSettings();

  return (
    <div className="p-4">
      <Timeline>
        {EducationData.map((edu, i) => (
          <TimelineItem
            key={i}
            range={edu.range}
            title={edu.school}
            subtitle={`${tr(edu.degree)} - ${tr(edu.major)}`}
            image={edu.logo}
          >
            <Item variant={'glass'}>
              <ItemContent>
                <ItemTitle>
                  {edu.gpa?.value} / {edu.gpa?.max}
                </ItemTitle>
                <ItemDescription>GPA</ItemDescription>
              </ItemContent>
            </Item>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default EducationPage;
