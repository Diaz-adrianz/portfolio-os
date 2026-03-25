import notificationStore from '@/stores/notification.store';

const useNotification = () => {
  const store = notificationStore();
  return { ...store };
};

export default useNotification;
