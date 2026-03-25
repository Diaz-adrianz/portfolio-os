const getValue = (obj: any, path?: string) => {
  if (!path) return obj;
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

export const sortArray = <T>(
  arr: T[],
  field?: string,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  const copy = [...arr];

  copy.sort((a, b) => {
    const valA = getValue(a, field);
    const valB = getValue(b, field);

    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return copy;
};
