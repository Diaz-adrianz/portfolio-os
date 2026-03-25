import { useCallback, type RefObject } from 'react';
import { toBlob } from 'html-to-image';

const useCapture = (ref: RefObject<HTMLElement | null>) => {
  const capture = useCallback(async () => {
    const el = ref.current;
    if (!el) return null;

    const blob = await toBlob(el, {
      pixelRatio: 0.1,
      style: {
        margin: '0',
        padding: '0',
        top: '0',
        left: '0',
        display: 'block',
        transform: 'none',
        transformOrigin: 'top left',
      },
      filter: (node) => {
        const tag = node.nodeName;
        return tag !== 'IFRAME' && tag !== 'VIDEO';
      },
      skipFonts: true,
      cacheBust: false,
      backgroundColor: '#fff',
    });

    if (!blob) return null;

    return URL.createObjectURL(blob);
  }, [ref]);

  return { capture };
};

export default useCapture;
