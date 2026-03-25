import { IlusNotes } from '@/assets/images';
import useSettings from '@/hooks/use-settings';
import { notesApp } from '../app';
import Image from 'next/image';

const IndexPage = () => {
  const { dict, tr } = useSettings();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <Image
        src={IlusNotes}
        alt=""
        width={160}
        height={160}
        className="m-auto mb-8"
      />
      <p className="typo-headline mb-1">
        {dict('welcomeTo', { name: tr(notesApp.title) })}
      </p>
      <p className="typo-footnote text-muted-foreground">
        {dict('notesWelcomeDescription')}
      </p>
    </div>
  );
};

export default IndexPage;
