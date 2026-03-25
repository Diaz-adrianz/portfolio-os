import type { Routes } from '@/components/molecules/page-router';
import EducationPage from './pages/education.page';
import ExperiencePage from './pages/experience.page';
import IndexPage from './pages/index.page';
import SkillPage from './pages/skill.page';

const ProfileRoutes: Routes = {
  index: () => <IndexPage />,
  education: () => <EducationPage />,
  skills: () => <SkillPage />,
  experience: () => <ExperiencePage />,
};

export default ProfileRoutes;
