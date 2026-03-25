import type { Option } from './option';

export type Day =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export const Day: Record<Day, Option<Day>> = {
  sunday: { value: 'sunday', label: { en: 'Sunday', id: 'Minggu' } },
  monday: { value: 'monday', label: { en: 'Monday', id: 'Senin' } },
  tuesday: { value: 'tuesday', label: { en: 'Tuesday', id: 'Selasa' } },
  wednesday: { value: 'wednesday', label: { en: 'Wednesday', id: 'Rabu' } },
  thursday: { value: 'thursday', label: { en: 'Thursday', id: 'Kamis' } },
  friday: { value: 'friday', label: { en: 'Friday', id: 'Jumat' } },
  saturday: { value: 'saturday', label: { en: 'Saturday', id: 'Sabtu' } },
};

export const Days = Object.values(Day);
