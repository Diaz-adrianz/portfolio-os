import { getRandomUserAgent } from '@/lib/scraper/header';

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get('url');
  if (!url) return new Response('Missing url', { status: 400 });

  const res = await fetch(url, {
    headers: {
      Referer: process.env.TONTONANIME_API_REFERER!,
      'User-Agent': getRandomUserAgent(),
    },
  });

  return new Response(res.body, {
    headers: {
      'Content-Type': res.headers.get('Content-Type') ?? 'video/mp4',
      'Content-Length': res.headers.get('Content-Length') ?? '',
      'Accept-Ranges': 'bytes',
    },
  });
}
