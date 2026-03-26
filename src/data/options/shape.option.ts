import {
  CircleIcon,
  HeartIcon,
  LucideIcon,
  SquareIcon,
  SquircleIcon,
} from 'lucide-react';
import type { Option } from './option';

export type Shape = 'square' | 'squircle' | 'circle' | 'heart';

export const Shape: Record<Shape, Option<Shape, { icon: LucideIcon }>> = {
  square: {
    value: 'square',
    label: { en: 'Square', id: 'Persegi' },
    meta: { icon: SquareIcon },
  },
  squircle: {
    value: 'squircle',
    label: { en: 'Squircle', id: 'Persegi bulat' },
    meta: { icon: SquircleIcon },
  },
  circle: {
    value: 'circle',
    label: { en: 'Circle', id: 'Lingkaran' },
    meta: { icon: CircleIcon },
  },
  heart: {
    value: 'heart',
    label: { en: 'Heart', id: 'Hati' },
    meta: { icon: HeartIcon },
  },
};

export const Shapes = Object.values(Shape);
