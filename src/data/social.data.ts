import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  type LucideIcon,
} from 'lucide-react';

export interface Link {
  link: string;
  label: string;
  icon: LucideIcon;
}

const SocialData: Link[] = [
  {
    link: 'https://www.linkedin.com/in/diaz-adriansyah',
    label: 'Linkedin',
    icon: LinkedinIcon,
  },
  {
    link: '',
    label: 'X',
    icon: TwitterIcon,
  },
  {
    link: 'https://www.instagram.com/zaid.jsx/',
    label: 'Instagram',
    icon: InstagramIcon,
  },
  {
    link: 'https://github.com/Diaz-adrianz',
    label: 'Github',
    icon: GithubIcon,
  },
];

export default SocialData;
