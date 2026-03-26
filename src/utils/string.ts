export const getRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const removeHtmlTags = (str: string) => {
  return str.replace(/<\/?[^>]+(>|$)/g, '');
};

export const getInitials = (str?: string) => {
  return str
    ? str
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    : '-';
};

export const matchRoute = (pattern: string, path: string) => {
  const regexPattern = pattern
    .replace(/:\w+/g, '([^/]+)')
    .replace(/\//g, '\\/');

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(path);
};

export const extractRoute = (
  pattern: string,
  path: string
): Record<string, string> | null => {
  const patternParts = pattern.split('/');
  const pathParts = path.split('/');

  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      const paramName = patternParts[i].slice(1);
      params[paramName] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
};

export const extractMarkdownText = (md: string) => {
  return md
    .replace(/[#*_>`~-]/g, '')
    .replace(
      /$begin:math:display$\(\.\*\?\)$end:math:display$$begin:math:text$\.\*\?$end:math:text$/g,
      '$1'
    )
    .replace(/\n+/g, ' ')
    .trim();
};

export const getContrastColor = (hex: string): '#000000' | '#ffffff' => {
  const clean = hex.replace('#', '');

  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;

  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance > 186 ? '#000000' : '#ffffff';
};
