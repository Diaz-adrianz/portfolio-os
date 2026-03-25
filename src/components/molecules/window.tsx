'use client';

import useWindows from '@/hooks/use-windows';
import { cn } from '@/utils/misc';
import {
  motion,
  useDragControls,
  type TargetAndTransition,
} from 'motion/react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type RefObject,
} from 'react';
import { ChevronsUpDownIcon, MinusIcon, XIcon } from 'lucide-react';
import Apps from '../organisms/apps';
import useDevice from '@/hooks/use-device';
import type { WindowState } from '@/stores/windows.store';
import Views from '../organisms/views';
import type { Route } from './page-router';
import Launchers from '../organisms/launchers';
import useSettings from '@/hooks/use-settings';
import useCapture from '@/hooks/use-capture';
import Image from 'next/image';

type Size = {
  width: number;
  height: number;
};

type Position = Pick<
  TargetAndTransition,
  'x' | 'y' | 'opacity' | 'scaleX' | 'scaleY' | 'scale'
>;

type ContextState = {
  id: string;
  initialRoute?: Route;
  close: () => void;
  minimize: () => void;
  maximize: () => void;
  drag: (e: React.PointerEvent<HTMLDivElement>) => void;
};

const Context = createContext<ContextState | null>(null);

const Window = ({
  state,
  constraint,
}: {
  state: WindowState;
  constraint: RefObject<HTMLDivElement | null>;
}) => {
  const _app = useMemo(() => Apps[state.appId], [state.appId]);
  const _ref = useRef<HTMLDivElement>(null);

  const { capture } = useCapture(_ref);
  const { deviceType, setPointerEvent } = useDevice();
  const { tr } = useSettings();
  const {
    topWindow,
    windows,
    focus,
    close,
    maximize,
    minimize,
    overview,
    setOverview,
    pushMinWindows,
    popMinWindows,
  } = useWindows();

  // ---------- Size (width + height) ----------
  const _getSize = () => {
    if (!constraint.current) return null;

    const { offsetWidth: constWidth, offsetHeight: constHeight } =
      constraint.current;

    if (deviceType == 'DESKTOP')
      return {
        width: Math.min(_app.windowConfig?.maxWidth ?? 920, 920),
        height: Math.min(
          (constHeight * 2) / 3,
          _app.windowConfig?.maxHeight ?? 700
        ),
      };

    if (deviceType == 'TABLET')
      return {
        width: Math.min(_app.windowConfig?.maxWidth ?? 600, 600),
        height: Math.min(
          (constHeight * 2) / 3,
          _app.windowConfig?.maxHeight ?? 400
        ),
      };

    return { width: constWidth, height: constHeight };
  };

  const [_size, _setSize] = useState<Size | null>(null);

  // ---------- Normal Position ----------
  const [_normalPos, _setNormalPos] = useState<Position | null>(null);

  const _getNormalPos = (size: Size) => {
    if (deviceType == 'MOBILE') return { x: 0, y: 0 };

    const randomOffset = Math.floor(Math.random() * 41) - 30;
    return {
      x:
        (constraint?.current?.offsetWidth ?? window.innerWidth) / 2 -
        size.width / 2 +
        randomOffset,
      y:
        (constraint?.current?.offsetHeight ?? window.innerHeight) / 2 -
        size.height / 2 +
        randomOffset,
    };
  };

  // ---------- Spawn Position ----------
  const [_spawnPos, _setSpawnPos] = useState<Position | null>(null);

  const _getSpawnPos = (id: string, size: Size) => {
    const icon = document.getElementById(id);
    if (!icon) return {};

    const iconRect = icon.getBoundingClientRect();

    const scaleW = iconRect.width / size.width;
    const scaleH = iconRect.height / size.height;
    const scale = Math.min(scaleW, scaleH);

    return {
      x: iconRect.left - size.width / 2 + (size.width * scaleW) / 2,
      y: iconRect.top - size.height / 2,
      scaleX: scale,
      scaleY: scale,
    };
  };

  // ---------- Overview Position ----------
  const [_overviewPos, _setOverviewPos] = useState<Position | null>(null);

  const _getOverviewPos = (size: Size) => {
    if (!constraint.current) return {};

    const PADDING = 12;

    const stackCount = windows.length;
    const bound = constraint.current.getBoundingClientRect();

    let cellW = 0,
      cellH = 0;
    let minDiff = Infinity;

    for (let rows = 1; rows <= stackCount; rows++) {
      const cols = Math.ceil(stackCount / rows);
      const boxWidth = bound.width / cols;
      const boxHeight = bound.height / rows;
      const aspectRatioDiff = Math.abs(boxWidth - boxHeight);

      if (aspectRatioDiff < minDiff) {
        minDiff = aspectRatioDiff;
        cellW = boxWidth;
        cellH = boxHeight;
      }
    }

    const cols = Math.round(bound.width / cellW);

    const winIndex = windows.findIndex((w) => w.id === state.id);
    const row = Math.floor(winIndex / cols);
    const col = winIndex % cols;

    const { width: winW, height: winH } = size;

    const scaleW = (cellW - PADDING * 2) / winW;
    const scaleH = (cellH - PADDING * 2) / winH;
    const scale = Math.min(scaleW, scaleH);

    const cellCenterX = cellW * col + cellW / 2;
    const cellCenterY = cellH * row + cellH / 2;

    const x = cellCenterX - winW / 2;
    const y = cellCenterY - winH / 2;

    return { x, y, scale };
  };

  // ---------- Drag ----------
  const dragControl = useDragControls();

  const _drag = (e: React.PointerEvent<HTMLDivElement>) => {
    dragControl.start(e);
  };

  const _dragEnd = () => {
    if (!_ref.current || !constraint.current) return;

    const boundConstraint = constraint.current.getBoundingClientRect();
    const boundWindow = _ref.current.getBoundingClientRect();

    const x = boundWindow.left - boundConstraint.left;
    const y = boundWindow.top - boundConstraint.top;

    _setNormalPos((p) => ({
      ...p,
      x: Math.max(x, 0),
      y: Math.max(y, 0),
    }));
  };

  // ---------- Focus ----------
  const _focus = () => {
    if (overview) setOverview(false);
    focus(state.id);
  };

  // ---------- Close ----------
  const _close = () => {
    if (_size) {
      const pos = _getSpawnPos(_app.launcherId, _size);
      _setSpawnPos({
        ...pos,
        scaleX: [1, (pos.scaleX ?? 0) + 0.1, pos.scaleX ?? 0],
        scaleY: [1, (pos.scaleY ?? 0) + 0.5, pos.scaleY ?? 0],
      });
    }
    close(state.id);
  };

  // ---------- Maximize ----------
  const _maximized = state.maximized;
  const [_maximizePos] = useState<Position>({
    x: 0,
    y: 0,
    scale: 1,
  });
  const _maximize = () => {
    maximize(state.id);
  };

  // ---------- Minimize ----------
  const [_minimized, _setMinimized] = useState(false);
  const [_minimizePos, _setMinimizePos] = useState<Position | null>(null);

  const _startMinimize = async (size: Size) => {
    if (state.minimized) {
      const captured = await capture();

      pushMinWindows(state.id, captured);
      await new Promise((resolve) => setTimeout(resolve, 1));
      const pos = _getSpawnPos(`launcher-win-${state.id}`, size);
      _setMinimizePos({
        ...pos,
        opacity: [1, 1, 1, 0],
        scaleX: [1, (pos.scaleX ?? 0) + 0.1, pos.scaleX ?? 0],
        scaleY: [1, (pos.scaleY ?? 0) + 0.5, pos.scaleY ?? 0],
      });
    } else {
      const pos = _getSpawnPos(`launcher-win-${state.id}`, size);
      _setMinimizePos({ ...pos, opacity: [0, 1, 1] });

      popMinWindows(state.id);
    }
    _setMinimized(state.minimized);
  };

  const _minimize = () => {
    minimize(state.id);
  };

  // ---------- Resize ----------
  const _resize = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    dir: 'both' | 'height' | 'width' = 'both'
  ) => {
    const isTouch = 'touches' in e;
    const startPoint = {
      x: isTouch ? e.touches[0].clientX : (e as React.MouseEvent).clientX,
      y: isTouch ? e.touches[0].clientY : (e as React.MouseEvent).clientY,
    };

    const resizing = (moveEvent: MouseEvent | TouchEvent) => {
      setPointerEvent(false);

      const moveX =
        'touches' in moveEvent
          ? moveEvent.touches[0].clientX
          : (moveEvent as MouseEvent).clientX;
      const moveY =
        'touches' in moveEvent
          ? moveEvent.touches[0].clientY
          : (moveEvent as MouseEvent).clientY;

      const deltaX = moveX - startPoint.x;
      const deltaY = moveY - startPoint.y;

      let newWidth = _size?.width ?? 0;
      let newHeight = _size?.height ?? 0;

      if ((dir === 'both' || dir === 'width') && typeof newWidth == 'number') {
        newWidth += deltaX;
        if (_app.windowConfig?.minWidth)
          newWidth = Math.max(newWidth, _app.windowConfig?.minWidth);
        if (_app.windowConfig?.maxWidth)
          newWidth = Math.min(newWidth, _app.windowConfig?.maxWidth);
        newWidth = Math.min(
          newWidth,
          constraint.current?.offsetWidth ?? window.innerWidth
        );
      }

      if (
        (dir === 'both' || dir === 'height') &&
        typeof newHeight == 'number'
      ) {
        newHeight += deltaY;
        if (_app.windowConfig?.minHeight)
          newHeight = Math.max(newHeight, _app.windowConfig?.minHeight);
        if (_app.windowConfig?.maxHeight)
          newHeight = Math.min(newHeight, _app.windowConfig.maxHeight);
        newHeight = Math.min(
          newHeight,
          constraint.current?.offsetHeight ?? window.innerHeight
        );
      }

      _setSize((s) => ({ ...s, width: newWidth, height: newHeight }));
    };

    const stopResize = () => {
      document.removeEventListener('mousemove', resizing);
      document.removeEventListener('mouseup', stopResize);
      document.removeEventListener('touchmove', resizing);
      document.removeEventListener('touchend', stopResize);
      setPointerEvent(true);
    };

    document.addEventListener('mousemove', resizing);
    document.addEventListener('mouseup', stopResize);
    document.addEventListener('touchmove', resizing);
    document.addEventListener('touchend', stopResize);
  };

  // ---------- Start Here ----------
  useEffect(() => {
    const size = _getSize();

    if (size) {
      const spawnPos = _getSpawnPos(_app.launcherId, size);
      const normalPos = _getNormalPos(size);

      _setSpawnPos(spawnPos);
      _setNormalPos({
        ...normalPos,
        opacity: 1,
        scaleX: [spawnPos.scaleX ?? 0, (spawnPos.scaleX ?? 0) + 0.2, 1],
        scaleY: [spawnPos.scaleY ?? 0, (spawnPos.scaleY ?? 0) + 0.5, 1],
      });
      _setSize(size);
    }
  }, [deviceType]);

  useEffect(() => {
    if (overview && _size) {
      const pos = _getOverviewPos(_size);
      _setOverviewPos(pos);
    }
  }, [overview, _size]);

  useEffect(() => {
    if (_size) _startMinimize(_size);
  }, [state.minimized]);

  return (
    _size != null && (
      <Context.Provider
        value={{
          id: state.id,
          initialRoute: state.route,
          close: _close,
          minimize: _minimize,
          maximize: _maximize,
          drag: _drag,
        }}
      >
        <motion.div
          id={state.id}
          ref={_ref}
          className={cn(
            'absolute top-0 left-0 flex h-auto w-fit flex-col items-stretch overflow-hidden',
            state.maximized || deviceType == 'MOBILE'
              ? 'rounded-none'
              : 'border-border/40 rounded-2xl border',
            topWindow?.id == state.id && 'shadow-xl'
          )}
          style={{
            zIndex: state.z,
            width: _size?.width,
            height: _size?.height,
          }}
          initial={{ ..._spawnPos }}
          animate={{
            scaleX: _normalPos?.scaleX,
            scaleY: _normalPos?.scaleY,
            ...(overview
              ? { ..._overviewPos }
              : _minimized
                ? { ..._minimizePos }
                : _maximized
                  ? { ..._maximizePos, width: '100%', height: '100%' }
                  : { ..._normalPos }),
          }}
          exit={{ ..._spawnPos }}
          transition={{
            power: 0,
            duration: 0.5,
          }}
          drag
          dragControls={dragControl}
          dragConstraints={constraint}
          dragTransition={{ power: 0 }}
          dragElastic={0.1}
          dragListener={false}
          onDragEnd={_dragEnd}
          onMouseDown={_focus}
        >
          <div
            className={cn(
              'h-full',
              (overview || topWindow?.id != state.id) && 'pointer-events-none'
            )}
          >
            {Views[_app.id]}
          </div>

          {deviceType != 'MOBILE' && (
            <>
              <div
                className="absolute right-0 bottom-0 size-2 cursor-nw-resize"
                onPointerDown={_resize}
                onTouchStart={_resize}
              />

              <div
                className="absolute top-2 right-0 bottom-2 w-1 cursor-w-resize"
                onPointerDown={(e) => _resize(e, 'width')}
                onTouchStart={(e) => _resize(e, 'width')}
              />

              <div
                className="absolute right-2 bottom-0 left-2 h-1 cursor-n-resize"
                onPointerDown={(e) => _resize(e, 'height')}
                onTouchStart={(e) => _resize(e, 'height')}
              />
            </>
          )}

          {overview && _app && (
            <div className="to-background absolute bottom-0 left-0 z-10 flex w-full items-center gap-2 bg-linear-to-b from-transparent p-4">
              <Image
                src={Launchers[_app.id].image}
                alt=""
                width={64}
                height={64}
                className="size-16"
              />
              <h4 className="typo-title-1">{tr(_app.title)}</h4>
            </div>
          )}
        </motion.div>
      </Context.Provider>
    )
  );
};

const WindowBar = ({
  children,
  className,
  ...props
}: ComponentProps<'div'>) => {
  const { deviceType } = useDevice();
  const { topWindow } = useWindows();
  const { id, close, minimize, maximize, drag } = useWindow();

  return (
    <div
      onPointerDown={drag}
      className={cn(
        'absolute top-0 right-0 left-0 z-20 flex h-10 w-full items-center gap-2 px-2',
        className
      )}
      {...props}
    >
      <div className="group flex w-fit gap-2 ps-2">
        <div
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
          className={cn(
            'flex h-3 w-3 rounded-full',
            topWindow?.id == id ? 'bg-red-500' : 'bg-secondary'
          )}
        >
          <XIcon
            size={10}
            className="m-auto hidden text-black group-hover:block"
          />
        </div>
        <div
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            minimize();
          }}
          className={cn(
            'flex h-3 w-3 rounded-full',
            topWindow?.id == id ? 'bg-yellow-500' : 'bg-secondary'
          )}
        >
          <MinusIcon
            size={10}
            className="m-auto hidden text-black group-hover:block"
          />
        </div>
        {deviceType != 'MOBILE' && (
          <div
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              maximize();
            }}
            className={cn(
              'flex h-3 w-3 rounded-full',
              topWindow?.id == id ? 'bg-green-500' : 'bg-secondary'
            )}
          >
            <ChevronsUpDownIcon
              size={10}
              className="m-auto hidden text-black group-hover:block"
            />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

const useWindow = () => {
  const ctx = useContext(Context);
  if (!ctx) throw new Error('useWindow must be used within a Window');
  return ctx;
};

export { useWindow, WindowBar };
export default Window;
