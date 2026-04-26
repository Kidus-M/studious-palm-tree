import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/chapa';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const txRef = request.nextUrl.searchParams.get('tx_ref');
    if (!txRef) {
      return NextResponse.redirect(new URL('/en/subscribe?error=missing_ref', request.url));
    }

    const result = await verifyPayment(txRef);

    if (result.data?.status === 'success') {
      // Update payment status
      const payment = await prisma.payment.update({
        where: { chapaRef: txRef },
        data: { status: 'SUCCESS' },
      });

      // Create or update subscription
      await prisma.subscription.upsert({
        where: { id: payment.id },
        create: {
          userId: payment.userId,
          plan: payment.plan,
          status: 'ACTIVE',
          episodeId: payment.episodeId,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        },
        update: {
          status: 'ACTIVE',
          plan: payment.plan,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
      });

      return NextResponse.redirect(new URL('/en?payment=success', request.url));
    } else {
      await prisma.payment.update({
        where: { chapaRef: txRef },
        data: { status: 'FAILED' },
      });
      return NextResponse.redirect(new URL('/en/subscribe?error=payment_failed', request.url));
    }
  } catch (error) {
    console.error('Payment verify error:', error);
    return NextResponse.redirect(new URL('/en/subscribe?error=verification_failed', request.url));
  }
}
