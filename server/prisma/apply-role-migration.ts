import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Altering users table to support superadmin role...");
  await prisma.$executeRawUnsafe(
    "ALTER TABLE `users` MODIFY COLUMN `role` ENUM('superadmin', 'admin', 'editor', 'user') NOT NULL DEFAULT 'user';"
  );
  console.log("Successfully altered users table!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
