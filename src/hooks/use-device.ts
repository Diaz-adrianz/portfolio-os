import { useState, useEffect } from 'react';

export type DeviceType = 'DESKTOP' | 'TABLET' | 'MOBILE';

const getDeviceType = (): DeviceType => {
  if (typeof window === 'undefined') return 'DESKTOP';
  const width = window.innerWidth;
  if (width < 768) return 'MOBILE';
  if (width >= 768 && width < 1024) return 'TABLET';
  return 'DESKTOP';
};

const useDevice = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType());

  useEffect(() => {
    const handleResize = () => setDeviceType(getDeviceType());
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const setPointerEvent = (s: boolean) => {
    document.documentElement.style.pointerEvents = s ? 'auto' : 'none';
  };

  return {
    deviceType,
    setPointerEvent,
  };
};

export default useDevice;
