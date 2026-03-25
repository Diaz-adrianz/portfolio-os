import {
  FileIcon,
  GithubIcon,
  GlobeIcon,
  HardDriveIcon,
  NotebookIcon,
  YoutubeIcon,
} from 'lucide-react';
import type { Media } from './media.data';
import MediaData from './media.data';
import type { Note } from './notes.data';
import type { Translation } from './options/locale.option';
import type { Link } from './social.data';
import NotesData from './notes.data';

export interface Work {
  id: string;
  name: string;
  category: string;
  caption: Translation;
  date?: { since: string; until?: string };
  media?: Media[];
  notes?: Note[];
  links?: Link[];
}

const WorkData: Work[] = [
  {
    id: '1',
    name: 'Comikaze',
    category: 'Mobile App',
    caption: { en: 'Mobile cross-platform.', id: 'Mobile cross-platform.' },
    date: { since: '2023-03-01', until: '2023-03-01' },
    media: [MediaData[11]],
    notes: [NotesData[4]],
    links: [
      {
        icon: GithubIcon,
        label: 'Github',
        link: 'https://github.com/Diaz-adrianz/comikaze-v2',
      },
      {
        icon: HardDriveIcon,
        label: 'Google drive',
        link: 'https://drive.google.com/drive/folders/1dCh6WwjZ4jI6tUJXwUmlEifYAACk4QXd?usp=drive_link',
      },
    ],
  },
  {
    id: '2',
    name: 'Serat',
    category: 'Web App',
    caption: {
      en: 'PHP web native at Eduwork course.',
      id: 'PHP web native at Eduwork course.',
    },
    date: { since: '2023-02-01', until: '2023-02-01' },
    media: [MediaData[12]],
    notes: [NotesData[5]],
  },
  {
    id: '3',
    name: 'Catshier',
    category: 'Desktop App',
    caption: {
      en: 'Java desktop app for school project',
      id: 'Java desktop app for school project',
    },
    date: { since: '2023-03-01', until: '2023-03-01' },
    media: [MediaData[13]],
    notes: [NotesData[6]],
  },
  {
    id: '4',
    name: 'Inventory Management',
    category: 'Web App',
    caption: {
      en: 'Teaching factory project',
      id: 'Teaching factory project',
    },
    date: { since: '2023-09-01', until: '2023-09-01' },
    media: [MediaData[14]],
    notes: [NotesData[7]],
  },
  {
    id: '5',
    name: 'Ingfokanime',
    category: 'Web App',
    caption: {
      en: 'Anime information library web platform',
      id: 'Anime information library web platform',
    },
    date: { since: '2022-06-01', until: '2022-06-01' },
    media: [MediaData[15]],
    notes: [NotesData[8]],
    links: [
      {
        icon: GlobeIcon,
        label: 'Website',
        link: 'https://ingfokanime.netlify.app',
      },
    ],
  },
  {
    id: '6',
    name: 'Gembox',
    category: 'Web App',
    caption: {
      en: 'Web project',
      id: 'Proyek web',
    },
    media: [MediaData[16]],
  },
  {
    id: '7',
    name: 'Maca',
    category: 'UI/UX',
    caption: {
      en: 'Mobile App UI/UX design',
      id: 'Mobile App UI/UX design',
    },
    media: [MediaData[17]],
  },
  {
    id: '8',
    name: 'Project Management',
    category: 'Web App',
    caption: {
      en: 'Product at Solusi Inovasi Pesat',
      id: 'Product at Solusi Inovasi Pesat',
    },
    date: { since: '2024-11-01', until: '2024-11-01' },
    media: [MediaData[18]],
  },
  {
    id: '9',
    name: 'Urwork',
    category: 'Mobile App',
    caption: {
      en: 'Android native app for school project',
      id: 'Android native app for school project',
    },
    date: { since: '2023-05-01', until: '2023-05-01' },
    media: [MediaData[19]],
    notes: [NotesData[9]],
    links: [
      {
        icon: GithubIcon,
        label: 'Github',
        link: 'https://github.com/Diaz-adrianz/urwork',
      },
    ],
  },
  {
    id: '10',
    name: 'Pagawe',
    category: 'Web App',
    caption: {
      en: 'Web project at Insan',
      id: 'Web project at Insan',
    },
    date: { since: '2022-12-01', until: '2022-12-01' },
    media: [MediaData[20]],
    notes: [NotesData[10]],
    links: [
      {
        icon: GithubIcon,
        label: 'Github',
        link: 'https://github.com/Diaz-adrianz/pagawe',
      },
      {
        icon: YoutubeIcon,
        label: 'Youtube',
        link: 'https://www.youtube.com/watch?v=XRf_29Q42C8',
      },
    ],
  },
  {
    id: '11',
    name: 'Credit Decision',
    category: 'Machine Learning',
    caption: {
      en: 'Home credit loan decision system',
      id: 'Sistem keputusan peminjaman kredit rumah',
    },
    date: { since: '2025-03-01', until: '2025-06-01' },
    media: [MediaData[35]],
    links: [
      {
        icon: NotebookIcon,
        label: 'Notebook Code',
        link: 'https://colab.research.google.com/drive/1912HAEr5kblVflGxbv0h56Ep9HzpBzP8',
      },
      {
        icon: GithubIcon,
        label: 'Application Code',
        link: 'https://github.com/Diaz-adrianz/Home-Loan-Decision-System-Web',
      },
    ],
  },
  {
    id: '12',
    name: 'Tiktok Shop Scraper',
    category: 'Web Scraping',
    caption: {
      en: 'Tiktok Shop internal API scraper',
      id: 'Scraper internal API Tiktok Shop',
    },
    date: { since: '2025-07-01', until: '2025-07-01' },
    media: [MediaData[33]],
    links: [
      {
        icon: GithubIcon,
        label: 'Source code',
        link: 'https://github.com/Diaz-adrianz/tiktokshop-scraper',
      },
    ],
  },
  {
    id: '13',
    name: 'ZakatPoint',
    category: 'Web App',
    caption: {
      en: 'Zakat payment application',
      id: 'Aplikasi pembayaran zakat',
    },
    date: { since: '2025-07-01', until: '2025-07-01' },
    media: [MediaData[29]],
    links: [
      {
        icon: GithubIcon,
        label: 'Source code',
        link: 'https://github.com/Diaz-adrianz/ZakatPoint/',
      },
    ],
  },
  {
    id: '14',
    name: 'Shopping Receipt Extractor',
    category: 'Deep Learning',
    caption: {
      en: 'Shopping receipt scan and extract data',
      id: 'Pindai dan ekstrak data struk belanja',
    },
    date: { since: '2025-12-01', until: '2025-12-01' },
    media: [MediaData[34]],
    links: [
      {
        icon: GithubIcon,
        label: 'Source code',
        link: 'https://github.com/Diaz-adrianz/receipt-extractor',
      },
      {
        icon: FileIcon,
        label: 'Paper',
        link: 'https://drive.google.com/file/d/1X8rR7GCOMErSCvQb-UWT-SlG4Mn7xVDL/view?usp=sharing',
      },
    ],
  },
  {
    id: '15',
    name: 'Curaweda',
    category: 'Website',
    caption: {
      en: 'Curaweda company profile website',
      id: 'Website profil usaha Curaweda',
    },
    date: { since: '2025-02-01', until: '2025-03-01' },
    media: [MediaData[31]],
    links: [
      {
        icon: GlobeIcon,
        label: 'Website',
        link: 'https://curaweda.com',
      },
    ],
  },
  {
    id: '16',
    name: 'Student Admission',
    category: 'Web App',
    caption: {
      en: 'Sekolah Alam Student Admission Web',
      id: 'Sistem penerimaan murid baru Sekolah Alam',
    },
    media: [MediaData[32]],
    date: { since: '2025-08-01', until: '2025-12-01' },
  },
  {
    id: '17',
    name: 'Soulframe',
    category: 'Website',
    caption: {
      en: 'Soulframe company profile website',
      id: 'Website profil usaha Soulframe',
    },
    date: { since: '2026-02-01', until: '2026-03-01' },
    media: [MediaData[30]],
    links: [
      {
        icon: GlobeIcon,
        label: 'Website',
        link: 'https://soulframe-ph.vercel.app',
      },
    ],
  },
];

const WorkCategories = new Set(WorkData.map((w) => w.category));

export { WorkCategories };
export default WorkData;
