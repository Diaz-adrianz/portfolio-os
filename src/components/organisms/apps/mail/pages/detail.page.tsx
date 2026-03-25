import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/atoms/item';
import { Markdown } from '@/components/atoms/markdown';
import MailData from '@/data/mail.data';
import useSettings from '@/hooks/use-settings';
import { formatTime } from '@/utils/date';

const DetailPage = ({ id }: { id: string }) => {
  const { sentMails, tr, dict } = useSettings();

  const mail = [...MailData, ...sentMails].find((d) => d.id == id);

  return (
    <div className="p-4">
      {mail && (
        <>
          <Item className="mb-4 p-0">
            <ItemContent>
              <ItemTitle>
                {mail.from.name}{' '}
                {mail.from.email && (
                  <div className="text-muted-foreground">{`<${mail.from.email}>`}</div>
                )}
              </ItemTitle>

              <ItemDescription>
                <small className="typo-footnote">
                  {dict('to')}: {mail.to.name}{' '}
                  {mail.to.email && <span>{`<${mail.to.email}>`}</span>}
                  <br />
                  {formatTime(mail.createdAt, 'dddd, DD MMM YYYY HH:mm A')}
                </small>
              </ItemDescription>
            </ItemContent>
          </Item>
          <Markdown>{`## ${tr(mail.subject)} \n --- \n ${tr(mail?.content)}`}</Markdown>
        </>
      )}
    </div>
  );
};

export default DetailPage;
