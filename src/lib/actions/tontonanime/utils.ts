export function decryptSourceUrl(url: string): string {
  return url
    .replace(/^--/, '')
    .match(/../g)!
    .map((hex) => String.fromCharCode(parseInt(hex, 16) ^ 56))
    .join('')
    .replace(/^8/, '')
    .replace('/clock', '/clock.json');
}
