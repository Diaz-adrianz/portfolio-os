import * as y from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import useNotification from '@/hooks/use-notiification';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/atoms/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { Subject, Subjects } from '@/data/options/subject.option';
import { useEffect } from 'react';
import { Button } from '@/components/atoms/button';
import { formatTime } from '@/utils/date';
import { getOption } from '@/data/options/option';
import Biodata from '@/data/biodata';
import useSettings from '@/hooks/use-settings';

const schema = y.object().shape({
  name: y.string().required('required'),
  email: y.string().email('invalidFormat').required('required'),
  subject: y.mixed<Subject>().required('required'),
  message: y.string().required('required'),
});

const IndexPage = () => {
  const { notify, remove } = useNotification(),
    { sentMails, setSentMails, dict, tr } = useSettings();

  const form = useFormik<y.InferType<typeof schema>>({
    initialValues: {
      name: '',
      email: '',
      subject: 'hello',
      message: 'Sent from web',
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (val, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const loading = notify({
        title: 'Sending your message',
        type: 'loading',
        message: 'Please wait a moment',
      });

      try {
        const fd = new FormData();
        for (const key in val) fd.append(key, val[key as keyof typeof val]);

        await axios.post('/api/mails', fd);

        resetForm();
        notify({
          title: dict('sendingSuccessTitle'),
          message: dict('sendingSuccessMsg', { name: val.name }),
          type: 'success',
        });
        setSentMails([
          {
            id: crypto.randomUUID(),
            from: {
              name: val.name,
              email: val.email,
            },
            to: {
              name: Biodata.firstname,
              email: Biodata.email,
            },
            subject: getOption(Subject, val.subject)?.label ?? {
              en: '',
              id: '',
            },
            content: {
              en: val.message,
              id: val.message,
            },
            createdAt: formatTime(new Date(), 'YYYY-MM-DD HH:mm'),
          },
          ...sentMails,
        ]);
      } catch {
        notify({
          title: dict('sendingFailedTitle'),
          message: dict('sendingFailedMsg'),
          type: 'error',
        });
      } finally {
        remove(loading.id);
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (Object.keys(form.errors).length > 0) {
      const copyErrors = form.errors;
      notify({
        type: 'error',
        title: dict('validationFailed'),
        message: Object.entries(copyErrors)
          .map(([key, value]) => `${dict(key)} ${dict(value)}`)
          .join(', '),
      });
    }
  }, [form.errors]);

  return (
    <div className="p-4">
      <form onSubmit={form.handleSubmit} className="flex flex-col gap-1">
        <div className="mb-4 flex items-center justify-between">
          <h3
            className="typo-title-2"
            onClick={() =>
              notify({
                title: 'You found me',
                type: 'success',
                message: 'Just for test notif',
              })
            }
          >
            {dict('newMessage')}
          </h3>
          <Button
            type="submit"
            disabled={form.isSubmitting}
            className="cursor-pointer"
          >
            {dict('send')}
          </Button>
        </div>
        <InputGroup className="bg-background h-12 rounded-b-none border-none">
          <InputGroupInput
            name="name"
            className="text-end"
            value={form.values.name}
            onChange={form.handleChange}
          />
          <InputGroupAddon align="inline-start">
            <InputGroupText>{dict('name')}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup className="bg-background h-12 rounded-none border-none">
          <InputGroupInput
            name="email"
            type="email"
            className="text-end"
            value={form.values.email}
            onChange={form.handleChange}
          />
          <InputGroupAddon align="inline-start">
            <InputGroupText>{dict('email')}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup className="bg-background h-12 rounded-none border-none">
          <Select
            value={form.values.subject}
            onValueChange={(val) => form.setFieldValue('subject', val)}
          >
            <SelectTrigger className="ms-auto border-none bg-transparent!">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Subjects.map((item, i) => (
                <SelectItem key={i} value={item.value}>
                  {tr(item.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <InputGroupAddon align="inline-start">
            <InputGroupText>{dict('subject')}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup className="bg-background rounded-t-none border-none">
          <InputGroupTextarea
            name="message"
            value={form.values.message}
            onChange={form.handleChange}
          />
          <InputGroupAddon align="block-start">
            <InputGroupText>{dict('message')}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
};

export default IndexPage;
