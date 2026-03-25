import WindowsStore from '@/stores/windows.store';

const useWindows = () => {
  const store = WindowsStore();
  return { ...store };
};

export default useWindows;
