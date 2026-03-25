import {
  PageRouterProvider,
  PageRouterView,
  usePageRouter,
} from '@/components/molecules/page-router';
import ProfileRoutes from './routes';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/atoms/sidebar';
import {
  BriefcaseBusinessIcon,
  GraduationCapIcon,
  HammerIcon,
  User2Icon,
  type LucideIcon,
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import WindowSidebarLayout from '@/components/molecules/layouts/window-sidebar.layout';
import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import SocialData from '@/data/social.data';
import type { Translation } from '@/data/options/locale.option';
import useSettings from '@/hooks/use-settings';

const menu: { to: string; icon: LucideIcon; label: Translation }[] = [
  {
    to: 'index',
    icon: User2Icon,
    label: { en: 'Bio', id: 'Bio' },
  },
  {
    to: 'experience',
    icon: BriefcaseBusinessIcon,
    label: { en: 'Experience', id: 'Pengalaman' },
  },
  {
    to: 'education',
    icon: GraduationCapIcon,
    label: { en: 'Education', id: 'Pendidikan' },
  },
  {
    to: 'skills',
    icon: HammerIcon,
    label: { en: 'Skills', id: 'Keterampilan' },
  },
];

const View = () => {
  const { route, replace } = usePageRouter();
  const { dict, tr } = useSettings();

  return (
    <WindowSidebarLayout
      barSlot={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={'sm'} className="ms-auto" variant={'link'}>
              {dict('followMe')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {SocialData.map((item, i) => (
              <DropdownMenuItem key={i} asChild>
                <a href={item.link} target="_blank">
                  <item.icon className="text-muted-foreground" /> {item.label}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      }
      contentSlot={
        <>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menu.map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton
                      onClick={() => replace(item.to)}
                      isActive={route == item.to}
                    >
                      <item.icon className="text-muted-foreground" />{' '}
                      {tr(item.label)}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>{dict('socials')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {SocialData.map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton asChild>
                      <a href={item.link} target="_blank">
                        <item.icon className="text-muted-foreground" />{' '}
                        {item.label}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </>
      }
    >
      <AnimatePresence mode="wait">
        {PageRouterView({ routes: ProfileRoutes })}
      </AnimatePresence>
    </WindowSidebarLayout>
  );
};

const ProfileView = () => {
  return (
    <PageRouterProvider>
      <View />
    </PageRouterProvider>
  );
};

export default ProfileView;
