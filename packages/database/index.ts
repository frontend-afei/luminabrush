// export * from '@prisma/client' will lead to a warning in the console.
export { PrismaClient } from "@prisma/client";
export { prisma as db } from "./src/client";
export * from "./src/zod";
