import { Markdown } from '@/components/atoms/markdown';
import NotesData from '@/data/notes.data';
import useSettings from '@/hooks/use-settings';
import { formatTime } from '@/utils/date';

const DetailPage = ({ id }: { id: string }) => {
  const { tr } = useSettings();
  const note = NotesData.find((d) => d.id == id);

  return (
    <div className="p-4">
      <Markdown>{`## ${note?.title} \n--- ${tr(note?.content)}`}</Markdown>

      <small className="typo-footnote text-muted-foreground">
        {formatTime(note?.date, 'DD MMM YYYY')}
      </small>
    </div>
  );
};

export default DetailPage;
