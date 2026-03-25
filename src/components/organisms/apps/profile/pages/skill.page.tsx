import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/components/atoms/item';
import SkillData from '@/data/skill.data';

const SkillPage = () => {
  return (
    <div className="p-4">
      {Object.entries(SkillData).map(([key, items], i) => {
        return (
          <div key={i} className="mb-4">
            <p className="typo-callout mb-4 capitalize">{key}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((item, j) => (
                <Item key={j} className="w-fit" variant={'glass'}>
                  <ItemMedia>
                    <div className="size-4">
                      <img
                        src={item.icon}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{item.name}</ItemTitle>
                  </ItemContent>
                </Item>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillPage;
