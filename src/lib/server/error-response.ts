import { NextResponse } from 'next/server';
import { RateLimitError } from './rate-limit';
import { ActionResponse } from '../actions/type';

function errorResponseCore(err: any) {
  let status = 500,
    message = 'InternalServerError';

  if (process.env.NODE_ENV == 'development') console.log(err);

  if (err instanceof RateLimitError) {
    status = err.status;
    message = err.message;
  } else if (err.name == 'ValidationError') {
    status = 422;
    message = 'ValidationFailed';
  }

  return { status, message };
}

function errorResponseApi(err: any) {
  const { status, message } = errorResponseCore(err);

  return NextResponse.json({ message }, { status });
}

function errorResponseAction(err: any): ActionResponse<null> {
  const { message } = errorResponseCore(err);

  return { status: false, message, data: null };
}

export { errorResponseApi, errorResponseAction };
