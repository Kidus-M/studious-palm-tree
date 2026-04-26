import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tx_ref, status } = body;

    if (!tx_ref) {
      return NextResponse.json({ error: 'Missing tx_ref' }, { status: 400 });
    }

    // Find the payment
    const payment = await prisma.payment.findUnique({ where: { chapaRef: tx_ref } });
    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Already processed — idempotent
    if (payment.status === 'SUCCESS') {
      return NextResponse.json({ message: 'Already processed' });
    }

    if (status === 'success') {
      await prisma.payment.update({
        where: { chapaRef: tx_ref },
        data: { status: 'SUCCESS' },
      });

      await prisma.subscription.create({
        data: {
          userId: payment.userId,
          plan: payment.plan,
          status: 'ACTIVE',
          episodeId: payment.episodeId,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
      });
    } else {
      await prisma.payment.update({
        where: { chapaRef: tx_ref },
        data: { status: 'FAILED' },
      });
    }

    return NextResponse.json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
