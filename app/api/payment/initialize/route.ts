import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { initializePayment } from '@/lib/chapa';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { plan, episodeId } = body;

    if (!['PER_EPISODE', 'FULL_SEASON'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const amount = plan === 'FULL_SEASON' ? '299' : '49';
    const txRef = `tx-${uuidv4()}`;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Save pending payment
    await prisma.payment.create({
      data: {
        userId: session.user.id,
        chapaRef: txRef,
        amount: parseFloat(amount),
        currency: 'ETB',
        status: 'PENDING',
        plan,
        episodeId: episodeId || null,
      },
    });

    // Initialize Chapa payment
    const nameParts = (session.user.name || 'User').split(' ');
    const result = await initializePayment({
      amount,
      currency: 'ETB',
      email: session.user.email,
      first_name: nameParts[0] || 'User',
      last_name: nameParts[1] || '',
      tx_ref: txRef,
      callback_url: `${appUrl}/api/payment/webhook`,
      return_url: `${appUrl}/api/payment/verify?tx_ref=${txRef}`,
      customization: {
        title: 'Studio Palm Tree',
        description: plan === 'FULL_SEASON' ? 'Full Season Access' : 'Episode Access',
      },
    });

    return NextResponse.json({ checkout_url: result.data?.checkout_url });
  } catch (error) {
    console.error('Payment init error:', error);
    return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 });
  }
}
