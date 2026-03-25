import type { Translation } from './options/locale.option';

interface Biodata {
  resumeLink: string;
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  nicknames?: string[];
  titles: string[];
  age: number;
  timezone: string;
  gender: Translation;
  address: string;
  bio: Translation;
}

const Biodata: Biodata = {
  resumeLink:
    'https://docs.google.com/document/d/1XWwoJ-tM8kCKT491AX625_5QTLpmi4fBFo97E4f3c6Y/edit?usp=sharing',
  avatar: './images/diaz.webp',
  firstname: 'Diaz',
  lastname: 'Adriansyah',
  email: 'diazz.developer@gmail.com',
  titles: ['Software Engineer', 'Fullstack Developer'],
  age: 20,
  timezone: 'GMT+7',
  gender: { en: 'male', id: 'Laki-laki' },
  address: 'Bandung, Indonesia',
  bio: {
    en: "Hi, my name is **Diaz**, I was born and living in **Bandung City**. I am a passionate Software Engineer who translates abstract ideas into digital products that meet needs, wants, and problems. I specialize in full-stack web development with good knowledge of how information systems work.\n\nMy passion as a **software engineer** comes from curiosity about how the software on my first PC worked. So, I started to develop a deep understanding of software engineering principles and honed my problem-solving skills by autodidact and getting an education in the IT related field. \n\nWith over 2 years of career experience in the IT industry, I have worked with diverse teams to deliver successfull software solutions. I believe that software should not only work for a while, but should also be maintainable, future-proof, and beneficial for the business. I am always eager to improve my knowledge and skills to stay up-to-date with technology trends. \n\nApart from coding things, I enjoy to listening music, watching anime/movies, and playing cozy games. I'm excited to bring my passion to new challenges and opportunities.",
    id: 'Hai, nama saya Diaz, lahir dan tinggal di Kota Bandung. Saya seorang Software Engineer yang punya passion untuk mengubah ide-ide abstrak jadi produk digital yang benar-benar menjawab kebutuhan, keinginan, dan masalah. Saya fokus di full-stack web development, dengan pemahaman yang cukup kuat tentang bagaimana sistem informasi bekerja.\n\nKetertarikan saya di dunia software engineering berawal dari rasa penasaran tentang bagaimana software di PC pertama saya bisa berjalan. Dari situ, saya mulai mendalami prinsip-prinsip software engineering dan mengasah kemampuan problem solving secara autodidak, sekaligus melalui pendidikan di bidang IT.\n\nDengan pengalaman lebih dari 2 tahun di industri IT, saya sudah bekerja dengan berbagai tim untuk membangun solusi software yang sukses. Saya percaya software itu bukan cuma harus “jalan” untuk sementara, tapi juga harus maintainable, future-proof, dan punya dampak nyata untuk bisnis. Saya juga selalu berusaha untuk terus belajar dan mengikuti perkembangan teknologi terbaru.\n\nSelain coding, saya suka mendengarkan musik, nonton anime/film, dan main game cozy. Saya selalu antusias untuk menghadapi tantangan baru dan berkembang lewat peluang yang ada.',
  },
};

export default Biodata;
