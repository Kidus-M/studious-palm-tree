import { NextRequest, NextResponse } from 'next/server';
import { validateReferer } from '@/lib/content-protection';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const referer = request.headers.get('referer');
  const origin = request.headers.get('origin');

  // Validate referer — block external fetchers / IDM
  if (!validateReferer(referer, origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // In production, you would:
  // 1. Verify the JWT token via verifyVideoToken(token)
  // 2. Look up the episode's videoUrl from DB
  // 3. Stream the file with Range support
  // For now, return a placeholder response

  return new NextResponse(
    JSON.stringify({
      message: 'Stream endpoint ready',
      episodeId: token,
      note: 'Configure VIDEO_SIGNING_SECRET and provide video files to enable streaming',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    }
  );
}
