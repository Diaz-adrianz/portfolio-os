import { NextResponse } from 'next/server';
import { RateLimitError } from './rate-limit';

function errorResponse(err: any) {
  let status = 500,
    message = 'Internal server error';

  if (process.env.NODE_ENV == 'development') console.log(err);

  if (err instanceof RateLimitError) {
    status = err.status;
    message = err.message;
  } else if (err.name == 'ValidationError') {
    status = 422;
    message = 'Validasi gagal';
  }

  return NextResponse.json({ message }, { status });
}

export { errorResponse };
