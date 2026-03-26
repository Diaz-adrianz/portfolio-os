import { useState, useEffect } from 'react';

const useCamera = () => {
  const [cameraAllowed, setCameraAllowed] = useState<boolean | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    const checkPermissionAndEnumerate = async () => {
      try {
        const result = await navigator.permissions.query({
          name: 'camera' as PermissionName,
        });
        const isGranted = result.state === 'granted';
        setCameraAllowed(isGranted);

        if (isGranted) {
          const list = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = list.filter((d) => d.kind === 'videoinput');
          setDevices(videoDevices);
          if (videoDevices.length > 0) setDeviceId(videoDevices[0].deviceId);
        }

        result.onchange = async () => {
          const granted = result.state === 'granted';
          setCameraAllowed(granted);

          if (granted) {
            const list = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = list.filter((d) => d.kind === 'videoinput');
            setDevices(videoDevices);
            if (videoDevices.length > 0) setDeviceId(videoDevices[0].deviceId);
          } else {
            setDevices([]);
            setDeviceId('');
          }
        };
      } catch {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          stream.getTracks().forEach((track) => track.stop());
          setCameraAllowed(true);

          const list = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = list.filter((d) => d.kind === 'videoinput');
          setDevices(videoDevices);
          if (videoDevices.length > 0) setDeviceId(videoDevices[0].deviceId);
        } catch {
          setCameraAllowed(false);
        }
      }
    };

    checkPermissionAndEnumerate();
  }, []);

  return { cameraAllowed, devices, deviceId, setDeviceId };
};

export default useCamera;
