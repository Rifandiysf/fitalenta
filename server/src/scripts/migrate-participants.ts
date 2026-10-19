import "dotenv/config";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { Gender, RegistrationStatus } from "../../generated/prisma/client";

/**
 * Format data input peserta lama (kompatibel dengan export dump tabel ojetu / fitalenta Laravel)
 */
export interface LegacyParticipantRecord {
  // Akun & Kontak
  name: string;
  email: string;
  phone?: string | null;
  nik?: string | null;
  gender?: "L" | "P" | "laki-laki" | "perempuan" | null;
  
  // Data Pribadi
  birth_place?: string | null;
  birth_date?: string | null;
  address?: string | null;
  
  // Pendidikan & Aktivitas
  last_education?: string | null;
  major?: string | null;
  education_institution?: string | null;
  current_activity?: string | null;
  marital_status?: string | null;
  
  // Orang Tua / Wali
  parent_phone?: string | null;
  parent_relationship?: string | null;
  
  // Wilayah Domisili / KTP
  ktp_province_code?: string | null;
  ktp_province_name?: string | null;
  ktp_city_code?: string | null;
  ktp_city_name?: string | null;
  ktp_address?: string | null;
  domicile_province_code?: string | null;
  domicile_province_name?: string | null;
  domicile_city_code?: string | null;
  domicile_city_name?: string | null;
  domicile_address?: string | null;

  // Berkas / File
  photo_path?: string | null;
  n4_certificate_path?: string | null;
  ssw_certificate_path?: string | null;

  // Program & Status Pendaftaran
  program_id?: number | null;
  program_name?: string | null;
  registration_code?: string | null;
  registration_status?: "menunggu" | "lolos" | "tidak_lolos" | string | null;
  created_at?: string | null;
}

function normalizeGender(raw?: string | null): Gender | null {
  if (!raw) return null;
  const lower = raw.trim().toLowerCase();
  if (lower === "l" || lower.startsWith("laki") || lower === "male") return Gender.L;
  if (lower === "p" || lower.startsWith("perem") || lower === "female") return Gender.P;
  return null;
}

function normalizeStatus(raw?: string | null): RegistrationStatus {
  if (!raw) return RegistrationStatus.menunggu;
  const lower = raw.trim().toLowerCase();
  if (lower === "lolos" || lower === "passed" || lower === "diterima") return RegistrationStatus.lolos;
  if (lower === "tidak_lolos" || lower === "gagal" || lower === "rejected") return RegistrationStatus.tidak_lolos;
  return RegistrationStatus.menunggu;
}

function generateRegCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `REG-${timestamp}-${random}`;
}

/**
 * Main migration function
 */
export async function migrateParticipants(filePath?: string) {
  const defaultPassword = process.env.DEFAULT_PARTICIPANT_PASSWORD || "Fitalenta2026!";
  const targetFile = filePath || path.join(process.cwd(), "prisma", "data", "legacy-participants.json");

  console.log("=================================================");
  console.log("       MIGRASI DATA PESERTA OJETU / FITALENTA    ");
  console.log("=================================================");

  if (!fs.existsSync(targetFile)) {
    console.warn(`File sumber tidak ditemukan: ${targetFile}`);
    console.log("Silakan tempatkan export JSON data peserta lama pada path tersebut.");
    console.log("Format JSON yang didukung adalah array objek sesuai interface LegacyParticipantRecord.");
    return;
  }

  const rawData = fs.readFileSync(targetFile, "utf-8");
  const records: LegacyParticipantRecord[] = JSON.parse(rawData);

  console.log(`Jumlah baris data ditemukan: ${records.length}`);
  console.log(`Menggunakan password seragam: ${defaultPassword}`);

  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // Ambil program default sebagai fallback jika program_id tidak spesifik
  const defaultProgram = await prisma.program.findFirst({
    orderBy: { id: "asc" },
  });

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const record of records) {
    if (!record.email || !record.name) {
      console.warn(`[SKIP] Baris tidak memiliki nama atau email valid.`);
      skippedCount++;
      continue;
    }

    const email = record.email.trim().toLowerCase();

    try {
      // 1. Upsert Akun User
      let user = await prisma.user.findUnique({ where: { email } });

      const birthDate = record.birth_date ? new Date(record.birth_date) : null;

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name: record.name.trim(),
            password: hashedPassword,
            phone: record.phone?.trim() ?? null,
            address: record.address ?? record.domicile_address ?? null,
            birthPlace: record.birth_place ?? null,
            birthDate: isNaN(birthDate?.getTime() ?? NaN) ? null : birthDate,
            role: "user",
            emailVerifiedAt: new Date(),
          },
        });
        createdCount++;
      } else {
        // Update data profil user yang sudah ada
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            name: record.name.trim(),
            phone: record.phone?.trim() ?? user.phone,
            address: record.address ?? record.domicile_address ?? user.address,
            birthPlace: record.birth_place ?? user.birthPlace,
            birthDate: isNaN(birthDate?.getTime() ?? NaN) ? user.birthDate : birthDate,
            password: hashedPassword, // Seragamkan password juga
          },
        });
        updatedCount++;
      }

      // 2. Hubungkan ke Program yang sesuai
      let programId = record.program_id;
      if (!programId && record.program_name) {
        const foundProgram = await prisma.program.findFirst({
          where: { name: { contains: record.program_name } },
        });
        if (foundProgram) programId = foundProgram.id;
      }
      if (!programId && defaultProgram) {
        programId = defaultProgram.id;
      }

      if (programId) {
        const existingReg = await prisma.registration.findUnique({
          where: {
            unique_user_program: {
              userId: user.id,
              programId: programId,
            },
          },
        });

        const regStatus = normalizeStatus(record.registration_status);
        const regCode = record.registration_code?.trim() || existingReg?.registrationCode || generateRegCode();

        if (!existingReg) {
          const newReg = await prisma.registration.create({
            data: {
              userId: user.id,
              programId: programId,
              registrationCode: regCode,
              registrationStatus: regStatus,
              nik: record.nik ?? null,
              gender: normalizeGender(record.gender),
              birthPlace: record.birth_place ?? null,
              birthDate: isNaN(birthDate?.getTime() ?? NaN) ? null : birthDate,
              lastEducation: record.last_education ?? null,
              major: record.major ?? null,
              educationInstitution: record.education_institution ?? null,
              currentActivity: record.current_activity ?? null,
              maritalStatus: record.marital_status ?? null,
              parentPhone: record.parent_phone ?? null,
              parentRelationship: record.parent_relationship ?? null,
              ktpProvinceCode: record.ktp_province_code ?? null,
              ktpProvinceName: record.ktp_province_name ?? null,
              ktpCityCode: record.ktp_city_code ?? null,
              ktpCityName: record.ktp_city_name ?? null,
              ktpAddress: record.ktp_address ?? null,
              domicileProvinceCode: record.domicile_province_code ?? null,
              domicileProvinceName: record.domicile_province_name ?? null,
              domicileCityCode: record.domicile_city_code ?? null,
              domicileCityName: record.domicile_city_name ?? null,
              domicileAddress: record.domicile_address ?? null,
              photoPath: record.photo_path ?? null,
              n4CertificatePath: record.n4_certificate_path ?? null,
              sswCertificatePath: record.ssw_certificate_path ?? null,
              registrationDate: record.created_at ? new Date(record.created_at) : new Date(),
            },
          });

          // Inisialisasi Selection Status
          await prisma.selectionStatus.create({
            data: {
              registrationId: newReg.id,
              status: regStatus,
              notes: "Migrasi otomatis dari sistem legacy ojetu",
            },
          });

          // Inisialisasi Placement Status
          await prisma.placementStatus.create({
            data: {
              registrationId: newReg.id,
              status: "proses",
              notes: "Diinisialisasi dari migrasi",
            },
          });
        }
      }
    } catch (err) {
      console.error(`Gagal memproses peserta ${email}:`, err);
      skippedCount++;
    }
  }

  console.log("-------------------------------------------------");
  console.log(`✔ Akun baru dibuat: ${createdCount}`);
  console.log(`✔ Akun diperbarui: ${updatedCount}`);
  console.log(`⚠ Data dilewati/gagal: ${skippedCount}`);
  console.log(`✔ Semua peserta diseragamkan password-nya ke: ${defaultPassword}`);
  console.log("=================================================");
}

if (process.argv[1] && process.argv[1].endsWith("migrate-participants.ts")) {
  const filePathArg = process.argv[2];
  migrateParticipants(filePathArg)
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
