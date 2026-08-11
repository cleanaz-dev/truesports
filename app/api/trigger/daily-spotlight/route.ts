// app/api/trigger/select-spotlight/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { enqueueStoryGeneratorTasks, selectSpotlightGame } from '@/lib/ball-dont-lie';

export const maxDuration = 30;

function utcStartOfToday() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('x-api-key');
  if (authHeader !== process.env.STORY_GEN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const existing = await prisma.dailySpotlight.findFirst({
    where: { date: utcStartOfToday(), league: 'nba' },
  });
  if (existing) {
    return NextResponse.json({ status: 'already_selected', id: existing.id });
  }

  const spotlight = await selectSpotlightGame();
  if (!spotlight) {
    return NextResponse.json({ status: 'no_games_today' });
  }

  await enqueueStoryGeneratorTasks(spotlight, spotlight.gameStartTime);

  return NextResponse.json({ status: 'selected', spotlight });
}