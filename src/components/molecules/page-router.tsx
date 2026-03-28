'use client';

import {
  ComponentProps,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { motion } from 'motion/react';
import { ScrollArea } from '../atoms/scroll-area';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../atoms/context-menu';
import useSettings from '@/hooks/use-settings';
import { useWindow } from './window';

export type Route = string;
export type Routes = Record<
  Route,
  (params: Record<string, string>) => ReactNode
>;

type ContextState = {
  route: Route;
  push: (route: Route) => void;
  replace: (route: Route) => void;
  back: () => void;
  canBack: boolean;
};

const Context = createContext<ContextState | null>(null);

const PageRouterProvider = ({
  initialRoute = 'index',
  children,
}: {
  initialRoute?: Route;
  children: ReactNode;
}) => {
  const [history, setHistory] = useState<Route[]>([initialRoute]);

  const route = history[history.length - 1];

  const push = (next: Route) => {
    setHistory((h) => [...h, next]);
  };

  const replace = (next: Route) => {
    setHistory((h) => [...h.slice(0, -1), next]);
  };

  const back = () => {
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  };

  const value: ContextState = {
    route,
    push,
    replace,
    back,
    canBack: history.length > 1,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const usePageRouter = () => {
  const ctx = useContext(Context);
  if (!ctx)
    throw new Error('usePageRouter must be used within a PageRouterProvider');
  return ctx;
};

const matchRoute = (route: string, routes: Routes) => {
  for (const pattern in routes) {
    const keys: string[] = [];

    const regex = new RegExp(
      '^' +
        pattern.replace(/:([^/]+)/g, (_, k) => {
          keys.push(k);
          return '([^/]+)';
        }) +
        '$'
    );

    const match = route.match(regex);
    if (!match) continue;

    const params: Record<string, string> = {};
    keys.forEach((k, i) => (params[k] = match[i + 1]));

    return { render: routes[pattern], params };
  }

  return null;
};

const PageRouterView = ({ routes }: { routes: Routes }) => {
  const { route } = usePageRouter();

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTo = (
    v: number | 'top' | 'bottom',
    behavior: 'smooth' | 'instant' = 'smooth'
  ) => {
    scrollRef.current?.scrollTo({
      top: v == 'top' ? 0 : v == 'bottom' ? scrollRef.current.scrollHeight : v,
      left: 0,
      behavior,
    });
  };

  useEffect(() => {
    scrollTo('top', 'instant');
  }, [route]);

  const matched = matchRoute(route, routes);
  if (!matched) return null;

  const { render, params } = matched;

  return (
    <ScrollArea ref={scrollRef} className="bg-muted h-full">
      <motion.div
        key={route}
        initial={{ opacity: 0, translateY: 24, scaleY: 1.2 }}
        animate={{ opacity: 1, translateY: 0, scaleY: 1 }}
        exit={{ opacity: 0, translateY: 24 }}
        transition={{ duration: 0.2 }}
        style={{ transformOrigin: 'top center' }}
      >
        {render(params)}
      </motion.div>
    </ScrollArea>
  );
};

const PageRouterMenu = ({
  ...props
}: ComponentProps<typeof ContextMenuTrigger>) => {
  const { dict } = useSettings(),
    { appId } = useWindow(),
    { route } = usePageRouter();

  const _share = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('app', appId);
    url.searchParams.set('route', route);

    await navigator.share({ url: url.toString() }).catch(() => {
      // silent
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger {...props} />
      <ContextMenuContent>
        <ContextMenuItem onClick={_share} disabled={!navigator.canShare}>
          {dict('share')}...
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export {
  PageRouterProvider,
  matchRoute,
  PageRouterView,
  PageRouterMenu,
  usePageRouter,
};
