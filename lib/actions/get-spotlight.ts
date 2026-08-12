"use server";

import { prisma } from "../prisma";

export async function getSpotlight() {
  const spotlight = await prisma.dailySpotlight.findFirst({
    include: {
      stories: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return spotlight
}
