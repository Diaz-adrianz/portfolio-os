import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const IndexPage = () => {
  const webcamRef = useRef<Webcam>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((list) => {
      setDevices(list.filter((d) => d.kind === 'videoinput'));
    });
  }, []);

  const takePhoto = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setPhotos((prev) => [...prev.slice(-2), screenshot]);
    }
  };

  return (
    <div className="p-4">
      <div className="aspect-square w-full overflow-hidden rounded-xl">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/png"
          videoConstraints={{
            deviceId: deviceId ? { exact: deviceId } : undefined,
          }}
          mirrored={false}
        />
      </div>

      <button onClick={takePhoto}>Take Photo</button>
      <div style={{ marginTop: 20 }}>
        {photos.map((p, i) => (
          <img
            key={i}
            src={p}
            style={{ width: 100, height: 100, objectFit: 'cover', margin: 5 }}
          />
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
