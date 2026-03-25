import {
  Item,
  ItemContent,
  ItemHeader,
  ItemTitle,
} from '@/components/atoms/item';
import { LauncherList } from '@/components/organisms/launchers';
import useSettings from '@/hooks/use-settings';
import useWindows from '@/hooks/use-windows';
import Image from 'next/image';

const IndexPage = () => {
  const { open } = useWindows();
  const { tr } = useSettings();

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {LauncherList.map((item, i) => (
        <Item key={i} className="aspect-square w-32" asChild>
          <a href="#" onClick={() => open(item.appId)}>
            <ItemHeader>
              <Image
                src={item.image}
                alt=""
                width={96}
                height={96}
                className="m-auto size-24"
              />
            </ItemHeader>
            <ItemContent className="items-center">
              <ItemTitle>{tr(item.title)}</ItemTitle>
            </ItemContent>
          </a>
        </Item>
      ))}
    </div>
  );
};

export default IndexPage;
