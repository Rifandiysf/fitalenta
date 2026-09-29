import multer from "multer";
import path from "path";
import fs from "fs";

function createUploader(folder: string) {
  const uploadPath = path.join(process.cwd(), "uploads", folder);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, name);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (allowed.includes(file.mimetype)) cb(null, true);
      else cb(new Error("Format gambar tidak didukung (hanya JPG, PNG, WEBP, GIF)"));
    },
  });
}

export const uploadEventImage = createUploader("events");