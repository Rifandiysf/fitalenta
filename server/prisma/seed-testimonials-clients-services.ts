import "dotenv/config";
import fs from "fs";
import path from "path";
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

interface ScrapedTestimonial {
  client_name: string;
  company: string;
  content: string;
  rating: number;
}

interface ScrapedClient {
  name: string;
  logo_url: string;
}

interface ScrapedService {
  name: string;
  icon: string;
  short: string;
  description: string;
}

function readJson<T>(filename: string): T {
  const filePath = path.join(process.cwd(), "prisma", "data", filename);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

async function seedTestimonials() {
  const testimonials = readJson<ScrapedTestimonial[]>("testimonials.json");

  let count = 0;
  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: {
        clientName: t.client_name,
        company: t.company,
        content: t.content,
        rating: t.rating,
        isFeatured: false,
      },
    });
    count++;
  }
  console.log(`${count} testimoni berhasil di-seed`);
}

async function seedClients() {
  const clients = readJson<ScrapedClient[]>("clients.json");

  let count = 0;
  for (const c of clients) {
    await prisma.client.create({
      data: {
        name: c.name,
        logo: c.logo_url,
        isFeatured: false,
      },
    });
    count++;
  }
  console.log(`${count} klien/mitra berhasil di-seed`);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function seedServices() {
  const services = readJson<ScrapedService[]>("services.json");

  let count = 0;
  for (const s of services) {
    const slug = slugify(s.name);
    await prisma.service.upsert({
      where: { slug },
      update: {
        title: s.name,
        summary: s.short,
        icon: s.icon,
        content: {
          intro: s.short,
          description: s.description,
        },
      },
      create: {
        slug,
        title: s.name,
        summary: s.short,
        icon: s.icon,
        content: {
          intro: s.short,
          description: s.description,
        },
        isFeatured: false,
      },
    });
    count++;
  }
  console.log(`${count} layanan berhasil di-seed`);
}

async function main() {
  await seedTestimonials();
  await seedClients();
  await seedServices();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());