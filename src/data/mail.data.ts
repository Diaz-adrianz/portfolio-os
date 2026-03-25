import type { Translation } from './options/locale.option';

export interface Mail {
  id: string;
  from: {
    name: string;
    email?: string;
  };
  to: {
    name: string;
    email?: string;
  };
  createdAt: string;
  subject: Translation;
  content: Translation;
}

const MailData: Mail[] = [
  {
    id: '1',
    from: {
      name: 'Diaz',
      email: 'diazz.developer@gmail.com',
    },
    to: {
      name: 'Visitor',
    },
    createdAt: '2025-02-03 10:12',
    subject: {
      en: 'Welcome letter',
      id: 'Surat selamat datang',
    },
    content: {
      en: `
Dear Visitor,

Thank you so much for visiting my stunning OS themed website! I truly appreciate you taking the time to explore the content I've created. I hope you found it helpful and engaging.

If you have any questions, feedback, or simply want to share your thoughts, I would love to hear from you. Please feel free to leave a message anytime in Mail app — your input is always welcome and valuable for me.

I look forward to staying connected and hearing from you soon.

Best regards,  
Diaz
`,
      id: `
Dear Visitor,

Terima kasih banyak sudah mengunjungi website saya yang bertema OS ini! Saya sangat menghargai waktu yang kamu luangkan untuk menjelajahi konten yang saya buat. Semoga kamu merasa terbantu dan menikmati pengalamannya.

Kalau kamu punya pertanyaan, feedback, atau sekadar ingin berbagi pendapat, saya akan sangat senang mendengarnya. Silakan tinggalkan pesan kapan saja melalui aplikasi Surat— semua masukan sangat berarti bagi saya.

Saya berharap kita bisa tetap terhubung dan bisa mendengar kabar dari kamu.

Best regards,  
Diaz
`,
    },
  },
  {
    id: '2',
    from: {
      name: 'Diaz',
      email: 'diazz.developer@gmail.com',
    },
    to: {
      name: 'Visitor',
    },
    createdAt: '2025-02-05 22:37',
    subject: {
      en: 'Resource & credits',
      id: 'Sumber daya & kredit',
    },
    content: {
      en: `
I’d like to acknowledge the resources and references used in this web. Big thanks to the creators for their contributions!

- Web technologies: **Nextjs**
- UI Library: **[Shadcn](https://ui.shadcn.com/)** and **[MagicUI](https://magicui.design/)**
- Icons: **[Lucide](https://lucide.dev/icons/)**
- Dock icons: **[macOS App Icons](https://macosicons.com/)**
- 2D illustration: **[Undraw](https://undraw.co)**

[Source code](https://github.com/Diaz-adrianz/portfolio-os-v2) available here!

If you have any questions or need more details, feel free to ask! 😊
`,
      id: `
Saya ingin memberikan apresiasi untuk berbagai resource dan referensi yang digunakan dalam website ini. Terima kasih banyak kepada para kreator atas kontribusinya!

- Web technologies: **Nextjs**
- UI Library: **[Shadcn](https://ui.shadcn.com/)** and **[MagicUI](https://magicui.design/)**
- Icons: **[Lucide](https://lucide.dev/icons/)**
- Dock icons: **[macOS App Icons](https://macosicons.com/)**
- 2D illustration: **[Undraw](https://undraw.co)**

[Kode sumber](https://github.com/Diaz-adrianz/portfolio-os-v2) tersedia!

Jika kamu punya pertanyaan atau butuh detail lebih lanjut, jangan ragu untuk bertanya! 😊
`,
    },
  },
  {
    id: '3',
    from: {
      name: 'Killua Zoldyck',
    },
    to: {
      name: 'Visitor',
    },
    createdAt: '2025-02-05 16:24',
    subject: {
      en: 'Whatever',
      id: 'Terserah',
    },
    content: {
      en: `
Hello...

Look, I don't even know why I'm here. I'm just some random dummy data for this testimonial thing, and I'm probably wasting my time. But whatever — he seems fine, so I'll roll with it.

Just like me, your testimonial message could end up here too — sitting in the Mail inbox looking all official.

Anyway, don't mess it up.
`,
      id: `
Halo...

Jujur, saya juga nggak tahu kenapa saya ada di sini. Saya cuma dummy data random buat bagian testimonial ini, dan mungkin cuma buang-buang waktu. Tapi ya sudahlah — orangnya kelihatan oke, jadi saya ikutin saja.

Siapa tahu, sama seperti saya, pesan testimoni kamu juga bisa muncul di sini — nongkrong di kotak masuk, kelihatan resmi banget.

Pokoknya, jangan sampai salah kirim ya.
`,
    },
  },
];

export default MailData;
