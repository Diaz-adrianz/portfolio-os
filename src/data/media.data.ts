export interface Media {
  id: string;
  title: string;
  src: string;
  type: 'image' | 'video' | 'pdf';
  tags?: string[];
  meta?: Record<string, string>;
}

const MediaData: Media[] = [
  {
    id: '1',
    title: 'ITSSFB West Java',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740109839/certificates/eqlnr3wyuv84qzwtn5fh.webp',
    type: 'image',
  },
  {
    id: '2',
    title: 'ITSSFB Bandung',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740109839/certificates/qryyfvqsmjb4dbpyz86p.webp',
    type: 'image',
  },
  {
    id: '3',
    title: 'Oracle Java',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740109839/certificates/lzo98pmpmtmxeea8hnht.webp',
    type: 'image',
  },
  {
    id: '4',
    title: 'IC3 Digital Literacy',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740109839/certificates/mo9jirkvm4jiyy7betgg.webp',
    type: 'image',
  },
  {
    id: '5',
    title: 'Gits Intern',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740109839/certificates/tkp7zv9iexh3oit7b1ih.webp',
    type: 'image',
  },
  {
    id: '6',
    title: 'Minicase Compfest 14',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740109839/certificates/otec6bcxy5i4jm1clxeh.webp',
    type: 'image',
  },
  {
    id: '7',
    title: 'Mini Hackathon BFI',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740109839/certificates/p3oarzphmscr8kxh0qmy.webp',
    type: 'image',
  },
  {
    id: '8',
    title: 'Neuronworks TEFA',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740109839/certificates/zhbjy1gvfimdsgma31yn.webp',
    type: 'image',
  },
  {
    id: '9',
    title: 'Eduwork Basic Web',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740109839/certificates/o7jozvxn5vmlu8uap2t2.webp',
    type: 'image',
  },
  {
    id: '10',
    title: 'Dicoding Basic JS',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740109839/certificates/rzfudrjjl4gnodneu94s.webp',
    type: 'image',
  },
  {
    id: '11',
    title: 'Dicoding Basic Backend',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740109839/certificates/xft1dk2a1ig5mgpzmjyr.webp',
    type: 'image',
  },
  {
    id: '12',
    title: 'Comikaze',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740275544/project%20shots/gvtjmuqhwtkqnzqk9gqe.webp',
    type: 'image',
  },
  {
    id: '13',
    title: 'Serat Web',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740275544/project%20shots/vkqf8wdtbr2kxy32v1ix.webp',
    type: 'image',
  },
  {
    id: '14',
    title: 'Catshier Desktop',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740275544/project%20shots/wkyp3njzevpgmhy83kat.webp',
    type: 'image',
  },
  {
    id: '15',
    title: 'Inventory Management',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740275544/project%20shots/dgqhpy1eoffywiu5i4k0.webp',
    type: 'image',
  },
  {
    id: '16',
    title: 'Infgokanime',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740275544/project%20shots/ko45cu03t085hs6nahzb.webp',
    type: 'image',
  },
  {
    id: '17',
    title: 'Gembox App',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740275544/project%20shots/ojikxvdnoxox5rmgkbqx.webp',
    type: 'image',
  },
  {
    id: '18',
    title: 'Maca App Design',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740275544/project%20shots/r2bhgqhegrcm7ox6qqwo.webp',
    type: 'image',
  },
  {
    id: '19',
    title: 'Project Management',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740275544/project%20shots/dublcoszpvgupxox4odo.webp',
    type: 'image',
  },
  {
    id: '20',
    title: 'Urwork App',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740275544/project%20shots/xdqwqumpm0bpghaal3zm.webp',
    type: 'image',
  },
  {
    id: '21',
    title: 'Pagawe',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1740275544/project%20shots/fuo5dxyzorar9hpoxq0r.webp',
    type: 'image',
  },
  {
    id: '22',
    title: 'Wallpaper',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1683437950/samples/animals/three-dogs.jpg',
    type: 'image',
  },
  {
    id: '23',
    title: 'Wallpaper',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1683437946/samples/animals/reindeer.jpg',
    type: 'image',
  },
  {
    id: '24',
    title: 'Wallpaper',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1683437946/samples/food/fish-vegetables.jpg',
    type: 'image',
  },
  {
    id: '25',
    title: 'Wallpaper',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1683437955/samples/landscapes/nature-mountains.jpg',
    type: 'image',
  },
  {
    id: '26',
    title: 'Wallpaper',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1683437952/samples/landscapes/beach-boat.jpg',
    type: 'image',
  },
  {
    id: '27',
    title: 'Wallpaper',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1683437952/samples/landscapes/architecture-signs.jpg',
    type: 'image',
  },
  {
    id: '28',
    title: 'Wallpaper',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1683437947/samples/sheep.jpg',
    type: 'image',
  },
  {
    id: '29',
    title: 'Wallpaper',
    src: 'http://res.cloudinary.com/dv6fgxnug/image/upload/v1683437953/samples/ecommerce/accessories-bag.jpg',
    type: 'image',
  },
  {
    id: '30',
    title: 'ZakatPoint Solutions',
    src: 'https://res.cloudinary.com/dv6fgxnug/image/upload/v1774356925/project%20shots/Dosa_Slayer_PPT_bmvjil.png',
    type: 'image',
  },
  {
    id: '31',
    title: 'Soulframe About Page',
    src: 'https://res.cloudinary.com/dv6fgxnug/image/upload/v1774359388/project%20shots/Xnapper-2026-03-24-7.31.51_PM_Large_vcwcac.jpg',
    type: 'image',
  },
  {
    id: '32',
    title: 'Curaweda Landing Page',
    src: 'https://res.cloudinary.com/dv6fgxnug/image/upload/v1774359388/project%20shots/Xnapper-2026-03-24-7.34.27_PM_Large_hbbeok.jpg',
    type: 'image',
  },
  {
    id: '33',
    title: 'Sekolah Alam PMB',
    src: 'https://res.cloudinary.com/dv6fgxnug/image/upload/v1774359389/project%20shots/Xnapper-2026-03-24-7.37.03_PM_Large_jlr6p6.jpg',
    type: 'image',
  },
  {
    id: '34',
    title: 'Tiktok Shop Scraper Response',
    src: 'https://res.cloudinary.com/dv6fgxnug/image/upload/v1774359388/project%20shots/Xnapper-2026-03-24-7.39.57_PM_Large_bmz3sd.jpg',
    type: 'image',
  },
  {
    id: '35',
    title: 'Shopping Receipt Extractor',
    src: 'https://res.cloudinary.com/dv6fgxnug/image/upload/v1774359388/project%20shots/Xnapper-2026-03-24-7.47.34_PM_Large_o8jvyp.jpg',
    type: 'image',
  },
  {
    id: '36',
    title: 'Home Credit Decision Web',
    src: 'https://res.cloudinary.com/dv6fgxnug/image/upload/v1774359389/project%20shots/Xnapper-2026-03-24-8.19.55_PM_Large_uprwg5.jpg',
    type: 'image',
  },
  {
    id: '37',
    title: 'Red',
    src: 'https://res.cloudinary.com/dv6fgxnug/image/upload/v1774683094/Backgrounds/red-watercolor.jpg',
    type: 'image',
    tags: ['photobooth-background'],
    meta: {
      foreground: '#ffffff',
    },
  },
  {
    id: '38',
    title: 'Rainbow',
    src: 'https://res.cloudinary.com/dv6fgxnug/image/upload/v1774683095/Backgrounds/rainbow-watercolor.jpg',
    type: 'image',
    tags: ['photobooth-background'],
    meta: {
      foreground: '#000000',
    },
  },
  {
    id: '39',
    title: 'Pop Punk',
    src: 'https://res.cloudinary.com/dv6fgxnug/image/upload/v1774686222/Backgrounds/pop-punk.jpg',
    type: 'image',
    tags: ['photobooth-background'],
    meta: {
      foreground: '#ffffff',
      background: '#000000',
    },
  },
  {
    id: '40',
    title: 'Love You',
    src: 'https://res.cloudinary.com/dv6fgxnug/image/upload/v1774683145/Stickers/love-badge_h2fydt.png',
    type: 'image',
    tags: ['photobooth-sticker'],
  },
  {
    id: '41',
    title: 'XOXO',
    src: 'https://res.cloudinary.com/dv6fgxnug/image/upload/v1774683149/Stickers/xoxo_vcb6ji.png',
    type: 'image',
    tags: ['photobooth-sticker'],
  },
];

export default MediaData;
