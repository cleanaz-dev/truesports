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
  console.log(`[select-spotlight] Triggered at ${new Date().toISOString()}`);

  const authHeader = req.headers.get('x-api-key');
  if (authHeader !== process.env.STORY_GEN_API_KEY) {
    console.warn(`[select-spotlight] Unauthorized request`);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const existing = await prisma.dailySpotlight.findFirst({
    where: { date: utcStartOfToday(), league: 'nba' },
  });
  if (existing) {
    console.log(`[select-spotlight] Already selected today: spotlight ${existing.id}`);
    return NextResponse.json({ status: 'already_selected', id: existing.id });
  }

  const spotlight = await selectSpotlightGame();
  if (!spotlight) {
    console.log(`[select-spotlight] No games today, no-op`);
    return NextResponse.json({ status: 'no_games_today' });
  }

  console.log(`[select-spotlight] Selected spotlight ${spotlight.id}: ${spotlight.homeTeam} vs ${spotlight.awayTeam}, gameStartTime=${spotlight.gameStartTime.toISOString()}`);

  try {
    await enqueueStoryGeneratorTasks(spotlight, spotlight.gameStartTime);
  } catch (err) {
    console.error(`[select-spotlight] enqueueStoryGeneratorTasks threw:`, err);
    return NextResponse.json({ status: 'error', error: String(err), spotlight }, { status: 500 });
  }

  console.log(`[select-spotlight] Done — spotlight ${spotlight.id}`);
  return NextResponse.json({ status: 'selected', spotlight });
}