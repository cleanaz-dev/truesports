import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, user } from "./permissions";
import { UserRole } from "@/lib/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  baseURL: {
    allowedHosts: [
      "localhost:3000",
      "lvh.me:3000",
      "*.lvh.me:3000",
      "true-sports.vercel.app",
      "*.true-sports.vercel.app",
      "truesportslive.com",
      "*.truesportslive.com",
    ],
    fallback: "http://localhost:3000",
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://lvh.me:3000",
    "http://admin.lvh.me:3000",
    "https://admin.true-sports.vercel.app",
    "https://*.true-sports.vercel.app",
    "https://truesportslive.com",
    "https://*.truesportslive.com",
  ],

  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain:
        process.env.NODE_ENV === "production"
          ? ".true-sports.vercel.app"
          : ".lvh.me",
    },
    useSecureCookies: process.env.NODE_ENV === "production",
  },

  emailAndPassword: {
    enabled: true,
  },

  // ADD THIS BLOCK
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.USER,
        input: false,
      },
      phone: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [
    dash(),
    adminPlugin({
      defaultRole: UserRole.USER,
      ac,
      roles: {
        ADMIN: admin,
        USER: user,
      },
    }),
  ],
});
