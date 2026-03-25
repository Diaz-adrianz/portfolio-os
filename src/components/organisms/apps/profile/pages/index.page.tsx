import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar';
import { Button } from '@/components/atoms/button';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/atoms/item';
import { Markdown } from '@/components/atoms/markdown';
import Biodata from '@/data/biodata';
import useSettings from '@/hooks/use-settings';
import { getInitials } from '@/utils/string';
import {
  ExternalLinkIcon,
  HourglassIcon,
  MapPinIcon,
  MarsIcon,
  TimerIcon,
} from 'lucide-react';

const IndexPage = () => {
  const { tr, dict } = useSettings();

  return (
    <div className="p-4">
      <div className="mb-8 flex flex-col items-center text-center">
        <Avatar className="mb-4 size-32">
          <AvatarImage src={Biodata.avatar} alt="@shadcn" />
          <AvatarFallback>
            <h1>{getInitials(Biodata.firstname)}</h1>
          </AvatarFallback>
        </Avatar>
        <h3 className="typo-title-2">
          {Biodata.firstname} {Biodata.lastname}
        </h3>
        <p className="typo-body text-muted-foreground mb-4">
          {Biodata.titles.join(' • ')}
        </p>
        <Button className="capitalize" asChild>
          <a href={Biodata.resumeLink} target="_blank">
            {dict('viewResume')}
            <ExternalLinkIcon />
          </a>
        </Button>
      </div>

      <div className="mb-2 grid grid-cols-2 gap-2">
        <Item variant={'glass'}>
          <ItemMedia>
            <TimerIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{Biodata.timezone}</ItemTitle>
            <ItemDescription>{dict('timezone')}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant={'glass'}>
          <ItemMedia>
            <MapPinIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{Biodata.address}</ItemTitle>
            <ItemDescription>{dict('location')}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant={'glass'}>
          <ItemMedia>
            <HourglassIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              {Biodata.age} {dict('years')}
            </ItemTitle>
            <ItemDescription>{dict('age')}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant={'glass'}>
          <ItemMedia>
            <MarsIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{tr(Biodata.gender)}</ItemTitle>
            <ItemDescription>{dict('gender')}</ItemDescription>
          </ItemContent>
        </Item>
      </div>
      <Item variant={'glass'}>
        <ItemContent className="text-muted-foreground">
          <Markdown>{tr(Biodata.bio)}</Markdown>
        </ItemContent>
      </Item>
    </div>
  );
};

export default IndexPage;
