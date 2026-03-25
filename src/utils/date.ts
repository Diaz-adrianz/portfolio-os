import Config from '@/constants/config';
import moment from 'moment';
// import 'moment/locale/id';

export const formatTime = (
  time: any,
  format: string,
  {
    fb = '',
    locale = Config.DEFAULT_LOCALE,
  }: {
    fb?: string;
    locale?: string;
  } = {}
) => {
  if (!time) return fb;
  return moment.parseZone(time).locale(locale).format(format);
};

export const fromNow = (
  time: any,
  {
    fb = '',
    locale = Config.DEFAULT_LOCALE,
  }: {
    fb?: string;
    locale?: string;
  } = {}
) => {
  if (!time) return fb;
  return moment(time).locale(locale).fromNow();
};
