type SkillKey = 'programming' | 'framework' | 'database' | 'software';

interface Skill {
  icon?: string;
  name: string;
  description?: string;
}

const SkillData: Record<SkillKey, Skill[]> = {
  programming: [
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      name: 'typescript',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      name: 'javascript',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      name: 'css3',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      name: 'python',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      name: 'html5',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      name: 'php',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      name: 'java',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      name: 'csharp',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
      name: 'kotlin',
    },
  ],
  framework: [
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      name: 'React',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      name: 'Tailwindcss',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      name: 'Express',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
      name: 'Laravel',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg',
      name: 'NestJS',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      name: 'Vue',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      name: 'Flutter',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
      name: 'Bootstrap',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/quasar/quasar-original.svg',
      name: 'Quasar',
    },
  ],
  database: [
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      name: 'Postgresql',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      name: 'MySQL',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      name: 'MongoDB',
    },
  ],
  software: [
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      name: 'Visual Studio Code',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      name: 'Git',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg',
      name: 'Android Studio',
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      name: 'Figma',
    },
  ],
};

export default SkillData;
