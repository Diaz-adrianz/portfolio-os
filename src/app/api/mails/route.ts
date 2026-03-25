import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/server/rate-limit';
import { errorResponse } from '@/lib/server/error-response';

export async function POST(req: NextRequest) {
  try {
    await rateLimit(req);

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
    return errorResponse(err);
  }
}
