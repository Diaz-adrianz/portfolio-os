import type { Translation } from './options/locale.option';

interface EducationData {
  logo?: string;
  school: string;
  degree: Translation;
  major: Translation;
  range: {
    since: string;
    until?: string;
  };
  description?: Translation;
  gpa?: {
    value: number;
    max: number;
  };
}

const EducationData: EducationData[] = [
  {
    logo: 'https://fst.uinsgd.ac.id/wp-content/uploads/2020/05/cropped-logo-uin.png',
    school: 'UIN Bandung',
    degree: {
      en: 'Bachelor of Engineering',
      id: 'Sarjana Teknik',
    },
    major: {
      en: 'Informatics',
      id: 'Informatika',
    },
    range: {
      since: '2024-08-01',
    },
    gpa: {
      value: 3.93,
      max: 4.0,
    },
  },
  {
    logo: 'https://smkn4bdg.sch.id/image/smkn4.png',
    school: 'SMKN 4 Bandung',
    degree: {
      en: 'Student',
      id: 'Siswa',
    },
    major: {
      en: 'Software Engineering',
      id: 'Rekayasa Perangkat Lunak',
    },
    range: {
      since: '2021-06-01',
      until: '2024-05-01',
    },
    gpa: {
      value: 8.93,
      max: 10,
    },
  },
];

export default EducationData;
