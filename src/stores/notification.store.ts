import { create } from 'zustand';

export interface Notification {
  id: string;
  title: string;
  message?: string;
  type: 'loading' | 'info' | 'success' | 'warning' | 'error';
  overlay: boolean;
  createdAt: number;
}

interface NotificationState {
  notifications: Notification[];
}

interface NotificationAction {
  notify: (
    n: Omit<Notification, 'id' | 'createdAt' | 'overlay'>
  ) => Notification;
  remove: (id: string) => void;
  hideOverlay: (id: string) => void;
  clear: () => void;
}

const notificationStore = create<NotificationState & NotificationAction>(
  (set) => ({
    notifications: [],

    notify: (n) => {
      const notif = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        overlay: true,
        ...n,
      };
      set((state) => ({
        notifications: [notif, ...state.notifications],
      }));
      return notif;
    },

    hideOverlay: (id) =>
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, overlay: false } : n
        ),
      })),

    remove: (id) =>
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      })),

    clear: () => set({ notifications: [] }),
  })
);

export default notificationStore;
