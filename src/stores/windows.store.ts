import type { Route } from '@/components/molecules/page-router';
import { create } from 'zustand';

export type WindowState = {
  id: string;
  appId: string;
  minimized: boolean;
  maximized: boolean;
  z: number;
  route?: Route;
};

interface WindowsState {
  topWindow: Pick<WindowState, 'id' | 'appId'> | null;
  minWindows: (Pick<WindowState, 'id' | 'appId'> & {
    thumbnail: string | null;
  })[];
  windows: WindowState[];
  overview: boolean;
}

interface WindowsAction {
  open: (appId: string, route?: Route) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  maximize: (id: string) => void;
  setOverview: (state: boolean) => void;
  pushMinWindows: (id: string, thumbnail: string | null) => void;
  popMinWindows: (id: string) => void;
  clear: () => void;
}

const Windows: WindowsState = {
  topWindow: null,
  minWindows: [],
  windows: [],
  overview: false,
};

const WindowsStore = create<WindowsState & WindowsAction>((set) => ({
  ...Windows,
  open: (appId, route) =>
    set((state) => {
      const id = crypto.randomUUID();
      const maxZ = Math.max(...state.windows.map((w) => w.z), 0);

      return {
        topWindow: { id, appId },
        windows: [
          ...state.windows,
          {
            id,
            appId,
            minimized: false,
            maximized: false,
            z: maxZ + 1,
            route,
          },
        ],
      };
    }),
  close: (id) =>
    set((s) => ({
      windows: s.windows.filter((w) => w.id !== id),
    })),
  focus: (id) =>
    set((s) => {
      const maxZ = Math.max(...s.windows.map((w) => w.z), 0);
      const win = s.windows.find((w) => w.id === id);

      return {
        topWindow: win ? { id: win.id, appId: win.appId } : null,
        windows: s.windows.map((w) =>
          w.id === id ? { ...w, z: maxZ + 1, minimized: false } : w
        ),
      };
    }),
  minimize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, minimized: !w.minimized } : w
      ),
    })),
  maximize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w
      ),
    })),
  setOverview: (state) => set({ overview: state }),

  pushMinWindows: (id, thumbnail) =>
    set((s) => {
      const win = s.windows.find((w) => w.id == id);
      if (!win) return s;

      return {
        minWindows: [
          ...s.minWindows,
          { id: win.id, appId: win.appId, thumbnail },
        ],
      };
    }),

  popMinWindows: (id) =>
    set((s) => {
      const minWindows = [...s.minWindows];
      const i = minWindows.findIndex((w) => w.id === id);

      if (i !== -1) {
        if (minWindows[i].thumbnail)
          URL.revokeObjectURL(minWindows[i].thumbnail);
        minWindows.splice(i, 1);
      }

      return { minWindows: minWindows };
    }),

  clear: () =>
    set({
      windows: [],
      topWindow: null,
      overview: false,
    }),
}));

export default WindowsStore;
