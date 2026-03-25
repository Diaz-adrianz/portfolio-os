import type { Note } from './notes.data';
import NotesData from './notes.data';

interface Experience {
  role: string;
  type: string;
  company: {
    name: string;
    link?: string;
  };
  range: {
    since: string;
    until?: string;
  };
  note?: Note;
}

const ExperienceData: Experience[] = [
  {
    role: 'Fullstack Developer',
    type: 'fulltime',
    company: {
      name: 'Curaweda',
      link: 'https://curaweda.com',
    },
    range: {
      since: '2024-06-01',
    },
  },
  {
    role: 'Web Scraping Specialist',
    type: 'internship',
    company: {
      name: 'MrScraper',
      link: 'https://mrscraper.com/',
    },
    range: {
      since: '2025-07-01',
      until: '2025-09-01',
    },
  },
  {
    role: 'Software Engineer',
    type: 'internship',
    company: {
      name: 'Gits Indonesia',
      link: 'https://gits.id',
    },
    range: {
      since: '2024-01-01',
      until: '2024-05-01',
    },
  },
  {
    role: 'Fullstack Developer',
    type: 'internship',
    company: {
      name: 'Solusi Inovasi Pesat',
      link: 'https://sipp.co.id',
    },
    range: {
      since: '2023-10-01',
      until: '2024-01-01',
    },
    note: NotesData[3],
  },
  {
    role: 'Frontend Developer',
    type: 'apprenticeship',
    company: {
      name: 'Neuronworks',
      link: 'https://neuronworks.co.id/',
    },
    range: {
      since: '2023-08-01',
      until: '2023-09-01',
    },
    note: NotesData[2],
  },
  {
    role: 'Backend Developer',
    type: 'internship',
    company: {
      name: 'Insan',
      link: 'https://inagri.asia',
    },
    range: {
      since: '2023-02-01',
      until: '2023-07-01',
    },
    note: NotesData[1],
  },
  {
    role: 'Backend Developer',
    type: 'freelance',
    company: {
      name: 'Cobadulu',
      link: 'https://cobadulu.academy',
    },
    range: {
      since: '2022-09-01',
      until: '2022-10-01',
    },
    note: NotesData[0],
  },
];

export default ExperienceData;
