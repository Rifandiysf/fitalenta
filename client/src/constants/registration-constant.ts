export const REGISTRATION_STEPS = [
    { id: 1, title: "Data diri", description: "Kenali Anda" },
    { id: 2, title: "Program", description: "Pilih jalur" },
    { id: 3, title: "Konfirmasi", description: "Periksa data" },
] as const;

export const STEP_HEADINGS = {
    1: {
        title: "Kenali Anda lebih dekat",
        description: "Informasi ini digunakan sebagai identitas utama selama proses seleksi.",
    },
    2: {
        title: "Pilih jalur yang sesuai",
        description: "Bandingkan program yang tersedia dan pilih sesuai kebutuhan Anda.",
    },
    3: {
        title: "Periksa sebelum mengirim",
        description: "Pastikan seluruh informasi sudah benar sebelum pendaftaran dikirim.",
    },
} as const;

export const GENDERS = [
    { value: "L", label: "Laki-laki" },
    { value: "P", label: "Perempuan" },
] as const;

export const GENDER_VALUES = ["L", "P"] as const;

export const EDUCATION_LEVELS = [
    "SD",
    "SMP",
    "SMA/SMK",
    "D1",
    "D2",
    "D3",
    "D4",
    "S1",
    "S2",
    "S3",
] as const;

export const CURRENT_ACTIVITIES = [
    "Pelajar",
    "Mahasiswa",
    "Karyawan",
    "Wiraswasta",
    "Pencari Kerja",
    "Lainnya",
] as const;

export const MARITAL_STATUSES = ["Belum Menikah", "Sudah Menikah", "Cerai"] as const;

export const GUARDIAN_RELATIONS = ["Ayah", "Ibu", "Kakak", "Wali", "Lainnya"] as const;

export const PHOTO_RULES = {
    maxSize: 5 * 1024 * 1024,
    types: ["image/jpeg", "image/png", "image/webp"],
    accept: "image/jpeg,image/png,image/webp",
    label: "JPG, PNG, atau WEBP • Maksimal 5 MB",
} as const;
