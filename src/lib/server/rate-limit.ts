import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

type RateLimitOptions = {
  limit?: number;
  windowMs?: number;
};

class RateLimitError extends Error {
  status = 429;

  constructor() {
    super();
    this.message = 'TooManyRequest';
  }
}

function rateLimitCore(
  key: string,
  { limit = 4, windowMs = 60 * 1000 }: RateLimitOptions = {}
) {
  const now = Date.now();

  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, { count: 0, lastReset: now });
  }

  const data = rateLimitMap.get(key)!;

  if (now - data.lastReset > windowMs) {
    data.count = 0;
    data.lastReset = now;
  }

  if (data.count >= limit) {
    throw new RateLimitError();
  }

  data.count += 1;
}

function rateLimitApi(req: NextRequest, options?: RateLimitOptions) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown';

  rateLimitCore(ip, options);
}

async function rateLimitAction(options?: RateLimitOptions) {
  const h = await headers();

  const ip =
    h.get('x-forwarded-for')?.split(',')[0] || h.get('x-real-ip') || 'unknown';

  rateLimitCore(ip, options);
}

export { RateLimitError, rateLimitApi, rateLimitAction };
