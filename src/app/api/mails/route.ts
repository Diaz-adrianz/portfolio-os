import { NextRequest, NextResponse } from 'next/server';
import { rateLimitApi } from '@/lib/server/rate-limit';
import { errorResponseApi } from '@/lib/server/error-response';

export async function POST(req: NextRequest) {
  try {
    rateLimitApi(req);

    const formData = await req.formData();

    const res = await fetch(process.env.MAIL_URL!, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: 'Failed to send mail' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return errorResponseApi(err);
  }
}
