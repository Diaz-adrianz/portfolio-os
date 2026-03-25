import type { Translation } from './options/locale.option';

export interface Note {
  id: string;
  date: string;
  title: string;
  content: Translation;
}

const NotesData: Note[] = [
  {
    id: '1',
    date: '2022-10-01',
    title: 'Cobadulu Academy',
    content: {
      id: `
###### Key activities:
- Mengembangkan backend dan infrastruktur database.  
- Melakukan deployment aplikasi ke layanan hosting secara remote.  
- Mengintegrasikan tampilan frontend ke dalam view engine.

Cobadulu Academy adalah startup edutech yang membantu siswa SMA dan SMK dalam menentukan jurusan kuliah yang tepat agar sesuai dengan pilihan universitas mereka, melalui kelas yang beragam dan fleksibel.

Bersama seorang teman, kami mengembangkan aplikasi berbasis web yang digunakan untuk company profile, marketing, serta pemesanan kelas. Aplikasi ini juga memungkinkan admin untuk mengelola data peserta di setiap kelas.

Untuk pembayaran, kami menyediakan metode melalui payment gateway Mayar dengan pihak ketiga sebagai perantara, atau opsi bayar di tempat saat hari pelaksanaan kelas.

Teknologi yang kami gunakan adalah arsitektur monolith dengan **Node.js** dan **MongoDB** di sisi server, serta **HTML**, **TailwindCSS**, dan **EJS view engine** di sisi client.
`,
      en: `
###### Key activities:
- Develop backend and database infrastructure.
- Deploy applications remotely to hosting provider services.
- Integrating frontend designed views into view engine.

Cobadulu Academy is an educational technology startup that helps high school and vocational school students choose college majors to achieve the appropriate major at the university of their choice through varied and flexible classes.

Together with a friend, we developed a web-based application for company profiles, marketing, and class bookings. It allows admins to manage participant data collection in each class.

For payments, we provide a Mayar payment gateway method with a third party as intermediary or pay later on the day of the class meeting.

The technology we use is a monolith infrastructure with **NodeJS** and **MongoDB** on the server side while the client side uses **HTML**, **TailwindCSS**, and **EJS view engine**.
`,
    },
  },
  {
    id: '2',
    date: '2023-07-01',
    title: 'Insan Agritama',
    content: {
      id: `
###### Key activities:
- Memimpin dan membimbing tim backend development.
- Merancang dan mengelola data serta infrastruktur aplikasi.
- Mengelola dan menjaga aplikasi tetap berjalan di environment production pada layanan hosting.
- Melakukan meeting rutin dengan tim lintas divisi.
- Menerima allowance bulanan serta kesempatan untuk kontrak kerja.

Insan adalah startup yang bergerak di bidang IT consulting dan layanan produk IT. Pada akhir 2022, mereka membuka program pelatihan beasiswa selama 6 bulan untuk siswa SMA.

Saya lolos kualifikasi dan mendapat kesempatan untuk berkontribusi sebagai bagian dari tim developer. Bersama peserta beasiswa lainnya, kami mengembangkan aplikasi berbasis web dan perangkat IoT.

Aplikasi tersebut digunakan untuk mengelola pengumpulan limbah minyak jelantah rumah tangga di desa-desa binaan dari klien Insan, yaitu Telkom.

Kami merancang sistem mulai dari konsep dasar, alur sistem, hingga implementasi.

**Tech stack:** Django (REST API), Next.js
`,
      en: `
###### Key activities:
- Leading and guiding the backend development team.
- Designing and managing application infrastructure data.
- Manage and maintain the application in production mode on the hosting service provider.
- Conducting regular meetings with cross-functional teams.
- Receiving a monthly allowance and opportunity for employment contracts.

Insan is a startup operating in the field of IT consulting and IT product services. At the end of 2022, they opened a 6-month scholarship training program for high school students.

I passed the qualifications and had the opportunity to become an additional hand in the developer position. Together with other scholarship recipients, we developed website-based applications and IoT devices.

The application collects household used cooking oil waste in villages assisted by clients who requested it from Insan, namely Telkom.

We designed the system from basic concept and system flow to implementation.

**Tech stack:** Django (REST API), NextJS
`,
    },
  },
  {
    id: '3',
    date: '2023-09-01',
    title: 'PT Neuronworks',
    content: {
      id: `
###### Key activities:
- Memimpin dan mengarahkan tim developer.
- Merancang infrastruktur dan alur aplikasi.
- Mengembangkan fitur antarmuka web (UI).
- Melakukan deployment aplikasi secara remote.
- Mengoordinasikan feedback dengan end user.

Neuronworks Indonesia adalah perusahaan IT solutions. Pada pertengahan 2023, mereka berkolaborasi dengan **SMKN 4 Bandung** melalui program Teaching Factory.

Program ini memungkinkan siswa untuk mengerjakan proyek nyata berdasarkan permintaan klien dari software house.

Setelah melalui proses profiling, saya ditempatkan sebagai **Frontend Developer** dalam proyek Inventory Management. Saya juga membimbing anggota tim lain termasuk backend developer dan QA.

Kami mengembangkan konsep aplikasi mulai dari tahap perencanaan hingga implementasi.

**Tech stack:** React, DaisyUI, Laravel REST API
`,
      en: `
###### Key activities:
- Leading and directing developer team.
- Designing application infrastructure and flow.
- Developing web user interface features.
- Deploying applications remotely.
- Coordinating feedback with end users.

Neuronworks Indonesia is an IT solutions company. In mid-2023 they collaborated with **SMKN 4 Bandung** through the Teaching Factory program.

This program allows students to develop real projects based on client requests from software house companies.

After profiling, I was placed as a **Frontend Developer** in an Inventory Management project. I also guided other team members including backend developers and QA.

We developed the application concept from planning to implementation.

**Tech stack:** React, DaisyUI, Laravel REST API
`,
    },
  },
  {
    id: '4',
    date: '2024-01-01',
    title: 'Solusi Inovasi Pesat',
    content: {
      id: `
###### Key activities:
- Merancang dan mengembangkan produk digital perusahaan.
- Membangun dan mengelola business logic di sisi backend.
- Menerapkan prinsip DRY melalui standarisasi kode untuk menjaga maintainability.
`,
      en: `
###### Key activities:
- Design and develop company digital products.
- Build and manage backend business logic.
- Implement DRY principles through code standardization for maintainability.
`,
    },
  },
  {
    id: '5',
    date: '2023-03-01',
    title: 'Comikaze',
    content: {
      id: `
Comikaze adalah platform membaca komik yang menyediakan ribuan **Manga, Manhwa, dan Manhua** dalam terjemahan Bahasa Indonesia.

Seiring meningkatnya penggunaan gadget di kalangan remaja, kebutuhan akan platform membaca komik berbasis mobile juga ikut meningkat.

Peluang ini mendorong pengembangan Comikaze sebagai pengalaman membaca yang ringkas dan nyaman di perangkat mobile.

Proyek ini juga dilandasi oleh keyakinan bahwa pengetahuan tanpa implementasi tidak memiliki makna.

**Tech stack:** Flutter, ExpressJS, MongoDB
`,
      en: `
Comikaze is a comic reading platform providing thousands of **Manga, Manhwa, and Manhua** in Indonesian translation.

With the increasing use of gadgets among teenagers, the demand for mobile-based comic reading platforms also increased.

This opportunity inspired the development of Comikaze as a concise mobile reading experience.

The project was also motivated by the belief that knowledge without implementation is meaningless.

**Tech stack:** Flutter, ExpressJS, MongoDB
`,
    },
  },
  {
    id: '6',
    date: '2023-02-01',
    title: 'Serat Web',
    content: {
      id: `
Website katalog pakaian dengan fitur pencarian, sorting, serta integrasi dengan platform e-commerce.

Admin dapat mengelola inventori melalui dashboard dengan fungsi CRUD, sementara pengguna bisa menjelajahi produk pakaian dengan lebih efisien.

**Tech stack:** PHP, Bootstrap, JavaScript, MySQL
`,
      en: `
Clothing catalog website with searching, sorting, and integration with e-commerce platforms.

Admins manage inventory through a dashboard with CRUD functionality while users can explore clothing products efficiently.

**Tech stack:** PHP, Bootstrap, JavaScript, MySQL
`,
    },
  },
  {
    id: '7',
    date: '2023-03-01',
    title: 'Catshier Desktop App',
    content: {
      id: `
Aplikasi kasir berbasis **Java Swing** dengan tema kucing untuk mengelola produk, pelanggan, dan transaksi.

Menyediakan fitur manajemen inventori, pengelolaan data pelanggan, proses transaksi, serta laporan penjualan.

**Tech stack:** Java, Swing, MySQL
`,
      en: `
A cat-themed **Java Swing** cashier application for managing products, customers, and transactions.

Provides inventory management, customer organization, transaction processing, and sales reports.

**Tech stack:** Java, Swing, MySQL
`,
    },
  },
  {
    id: '8',
    date: '2023-09-01',
    title: 'Inventory Management',
    content: {
      id: `
Aplikasi berbasis web untuk pencatatan aset dan inventaris internal perusahaan.

Fitur yang tersedia meliputi pencatatan aset, pelacakan stok, log peminjaman, serta stock opname gudang.

**Tech stack:** ReactJS, DaisyUI, Laravel, MySQL
`,
      en: `
Web-based application for internal company asset and inventory tracking.

Features include asset recording, stock tracking, borrowing logs, and warehouse stock taking.

**Tech stack:** ReactJS, DaisyUI, Laravel, MySQL
`,
    },
  },
  {
    id: '9',
    date: '2022-06-01',
    title: 'Ingfokanime Web',
    content: {
      id: `
Platform eksplorasi anime yang menggunakan **Jikan API** dengan sumber data dari MyAnimeList.

Pengguna dapat mencari dan menjelajahi anime berdasarkan judul, genre, peringkat, waktu rilis, dan status tayang.

**Tech stack:** HTML, CSS, JavaScript
`,
      en: `
Anime discovery platform powered by the **Jikan API** with data from MyAnimeList.

Users can browse anime by title, genre, ranking, release time, and airing status.

**Tech stack:** HTML, CSS, JavaScript
`,
    },
  },
  {
    id: '10',
    date: '2023-05-01',
    title: 'Urwork App',
    content: {
      id: `
Aplikasi pelacak proyek siswa yang dilengkapi dengan fitur pengingat dan notifikasi.

Membantu siswa dalam mengelola tugas secara individu maupun kolaboratif untuk mengurangi stres dan meningkatkan produktivitas.

**Tech stack:** Kotlin, Android Studio, MongoDB, ExpressJS
`,
      en: `
Student project tracker application with reminders and notifications.

Helps students manage assignments individually or collaboratively to reduce stress and improve productivity.

**Tech stack:** Kotlin, Android Studio, MongoDB, ExpressJS
`,
    },
  },
  {
    id: '11',
    date: '2022-12-01',
    title: 'Pagawe Web',
    content: {
      id: `
Platform web yang memungkinkan karyawan mengekspresikan pikiran dan emosi secara privat melalui jurnal.

Perusahaan dapat memperoleh insight terkait kondisi kesehatan mental di lingkungan kerja untuk meningkatkan produktivitas dan kesejahteraan organisasi.

Proyek ini dikembangkan dalam waktu **3 hari** untuk memenuhi persyaratan beasiswa Inagri.

**Tech stack:** MongoDB, Express, React
`,
      en: `
A web platform that allows employees to privately express thoughts and emotions through journals.

Employers gain insights into workplace mental health conditions to improve productivity and organizational well-being.

Project built within **3 days** to fulfill requirements for the Inagri scholarship.

**Tech stack:** MongoDB, Express, React
`,
    },
  },
];

export default NotesData;
