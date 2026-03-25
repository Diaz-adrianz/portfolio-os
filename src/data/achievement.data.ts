import { LinkIcon } from 'lucide-react';
import type { Media } from './media.data';
import MediaData from './media.data';
import type { Translation } from './options/locale.option';
import type { Link } from './social.data';

export interface Achievement {
  name: Translation;
  date: string;
  media: Media;
  links?: Link[];
}

const AchievementData: Achievement[] = [
  {
    name: { en: 'ITSSFB West Java Province', id: 'ITSSFB West Java Province' },
    date: '2025-07-01',
    media: MediaData[0],
    links: [
      {
        icon: LinkIcon,
        label: 'Credential',
        link: 'https://sidebar.jabarprov.go.id/v/5AD3858532',
      },
    ],
  },
  {
    name: { en: 'ITSSFB Bandung City', id: 'ITSSFB Bandung City' },
    date: '2025-05-01',
    media: MediaData[1],
  },
  {
    name: { en: 'Oracle Java Fundamentals', id: 'Oracle Java Fundamentals' },
    date: '2025-06-01',
    media: MediaData[2],
  },
  {
    name: { en: 'IC3 Digital Literacy', id: 'IC3 Digital Literacy' },
    date: '2025-12-01',
    media: MediaData[3],
    links: [
      {
        icon: LinkIcon,
        label: 'Credential',
        link: 'https://www.credly.com/badges/4d5f9304-4b82-4f0a-bbe5-ba011918951c/public_url',
      },
    ],
  },
  {
    name: { en: 'PT Gits Internship', id: 'PT Gits Internship' },
    date: '2025-05-01',
    media: MediaData[4],
  },
  {
    name: {
      en: 'Minicase Competition Compfest 14',
      id: 'Minicase Competition Compfest 14',
    },
    date: '2022-09-01',
    media: MediaData[5],
    links: [
      {
        icon: LinkIcon,
        label: 'Credential',
        link: 'https://verify.compfest.id/cf-2022-2ae9e2bc-a441-4173-859d-a89571aa5e46',
      },
    ],
  },
  {
    name: {
      en: 'Mini Hackathon by BFI x Arkavidia 8.0',
      id: 'Mini Hackathon by BFI x Arkavidia 8.0',
    },
    date: '2023-02-01',
    media: MediaData[6],
  },
  {
    name: {
      en: 'PT Neuronworks Teaching Factory',
      id: 'PT Neuronworks Teaching Factory',
    },
    date: '2023-10-01',
    media: MediaData[7],
  },
  {
    name: {
      en: 'Eduwork Basic Web Development',
      id: 'Eduwork Basic Web Development',
    },
    date: '2022-10-01',
    media: MediaData[8],
  },
  {
    name: { en: 'Dicoding Basic Javascript', id: 'Dicoding Basic Javascript' },
    date: '2022-08-01',
    media: MediaData[9],
  },
  {
    name: { en: 'Dicoding Basic Backend', id: 'Dicoding Basic Backend' },
    date: '2025-09-01',
    media: MediaData[10],
  },
];

export default AchievementData;
