import { NextRequest } from 'next/server';

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

type RateLimitOptions = {
  limit?: number;
  windowMs?: number;
  key?: string;
};

class RateLimitError extends Error {
  status = 429;

  constructor(message = 'Too Many Requests') {
    super(message);
  }
}

async function rateLimit(req: NextRequest, options: RateLimitOptions = {}) {
  const { limit = 4, windowMs = 60 * 1000, key } = options;

  const ip =
    key || req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 0, lastReset: now });
  }

  const ipData = rateLimitMap.get(ip)!;

  if (now - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = now;
  }

  if (ipData.count >= limit) {
    throw new RateLimitError();
  }

  ipData.count += 1;
}

export { RateLimitError, rateLimit };
