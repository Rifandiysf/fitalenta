# Panduan Setup Production & Migrasi Data — FITALENTA

Dokumen ini berisi panduan teknis langkah demi langkah untuk melakukan deployment sistem **FITALENTA** ke server production (VPS / Cloud), mencakup konfigurasi web server Nginx, migrasi database, migrasi data peserta dari sistem lama (Laravel), dan pengelolaan proses aplikasi.

---

## 1. Ikhtisar Arsitektur Sistem

Repository ini merupakan hasil **penggabungan** dari dua repository terpisah sebelumnya:
1. **Website Profil Perusahaan** (`fitalenta.co.id` — sebelumnya berbasis Laravel dari repo `junlandaime/fitalenta`).
2. **Sistem Pendaftaran & Portal Peserta** (`registrasi.fitalenta.co.id` — sebelumnya berbasis Laravel dari repo `junlandaime/ojetu`).

Keduanya kini bersatu dalam satu arsitektur monorepo modern:
- **Frontend (`client/`)**: Next.js App Router (React 19, TypeScript, Tailwind CSS) — berjalan di port `3000`.
- **Backend API (`server/`)**: Express.js + Prisma ORM + TypeScript — berjalan di port `5000`.
- **Database**: MariaDB / MySQL.
- **Reverse Proxy**: Nginx + SSL Let's Encrypt (Certbot).
- **Process Manager**: PM2.

---

## 2. Prasyarat Server Production

Pastikan server (misal: Ubuntu 22.04 LTS atau 24.04 LTS) telah terpasang:
- **Node.js**: v20.x atau v22.x LTS (`node -v`)
- **npm**: v10+ (`npm -v`)
- **MariaDB** / **MySQL Server**: v10.6+ / v8.0+
- **Nginx Web Server**: `nginx -v`
- **PM2 Process Manager**: `npm install -g pm2`
- **Certbot (SSL)**: `apt install certbot python3-certbot-nginx -y`
- **Git**: `git --version`

---

## 3. Persiapan Database Production

Masuk ke MySQL / MariaDB sebagai root:
```bash
sudo mysql -u root -p
```

Jalankan perintah berikut untuk membuat database dan user khusus:
```sql
CREATE DATABASE fitalenta_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'fitalenta_user'@'localhost' IDENTIFIED BY 'PasswordKuatDatabase2026!';
GRANT ALL PRIVILEGES ON fitalenta_prod.* TO 'fitalenta_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 4. Konfigurasi Environment Variables

### A. Backend (`server/.env`)
Buat file `/var/www/fitalenta/server/.env` dengan isi:

```env
PORT=5000
NODE_ENV=production
TRUST_PROXY=true

# Database Connection
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=fitalenta_prod
DATABASE_USER=fitalenta_user
DATABASE_PASSWORD=PasswordKuatDatabase2026!

# URL Frontend & Cookie Security
CORS_ORIGIN=https://fitalenta.co.id
COOKIE_SECURE=true
COOKIE_SAME_SITE=lax
COOKIE_DOMAIN=.fitalenta.co.id

# JWT Authentication (Gunakan string acak minimal 32 karakter)
JWT_SECRET=super_secret_jwt_key_production_fitalenta_2026_secure
JWT_EXPIRES_IN=7d

# Password Default Seragam untuk Peserta Hasil Migrasi
DEFAULT_PARTICIPANT_PASSWORD=Fitalenta2026!

# Layanan Email (Resend / SMTP)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
MAIL_FROM="Fitalenta <no-reply@fitalenta.co.id>"

# Cloudflare Turnstile (Captcha)
TURNSTILE_SECRET_KEY=0x4AAAAAAxxxxxxxxxxxxxxxxxxxx
```

### B. Frontend (`client/.env.local` atau `client/.env.production`)
Buat file `/var/www/fitalenta/client/.env.local` dengan isi:

```env
NEXT_PUBLIC_API_URL=https://fitalenta.co.id/api
NEXT_PUBLIC_ASSET_URL=https://fitalenta.co.id
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAxxxxxxxxxxxxxxxxxxxx
```

---

## 5. Clone, Install, dan Build Aplikasi

Lakukan clone proyek ke direktori web server (misal `/var/www/fitalenta`):
```bash
cd /var/www
git clone https://github.com/.../fitalenta.git fitalenta
cd /var/www/fitalenta
```

### A. Setup Backend Server
```bash
cd /var/www/fitalenta/server
npm install

# 1. Jalankan generator dan migrasi database Prisma
npm run prisma:generate
npx prisma migrate deploy

# 2. Buat direktori penyimpanan upload dan atur hak akses
mkdir -p uploads/articles uploads/events uploads/gallery uploads/team-members uploads/testimonials uploads/registrations uploads/payment-proofs
chmod -R 775 uploads

# 3. Build bundle backend
npm run build

# 4. Seed Akun Admin Awal (Super Admin & Editor)
npm run seed:admin
```
> **Catatan Akun Default Hasil Seed:**
> - Super Admin: `admin@fitalenta.id` / Password: `Admin@123`
> - Editor: `editor@fitalenta.id` / Password: `Editor@123`
> *(Segera ganti password melalui antarmuka setelah login).*

### B. Setup Frontend Client
```bash
cd /var/www/fitalenta/client
npm install
npm run build
```

---

## 6. Prosedur Pemigrasian Data Peserta Lama (ojetu / fitalenta)

### Langkah 1: Ekspor Data dari Database Laravel Lama
Jalankan query SQL berikut pada database sistem lama (`ojetu` / `fitalenta`) untuk mengekstrak data seluruh pendaftar:

```sql
SELECT 
    u.name AS name,
    u.email AS email,
    u.phone AS phone,
    p.nik AS nik,
    p.gender AS gender,
    p.birth_place AS birth_place,
    p.birth_date AS birth_date,
    p.address AS address,
    p.last_education AS last_education,
    p.major AS major,
    p.education_institution AS education_institution,
    p.current_activity AS current_activity,
    p.marital_status AS marital_status,
    p.parent_phone AS parent_phone,
    p.parent_relationship AS parent_relationship,
    p.registration_code AS registration_code,
    p.status AS registration_status,
    p.program_name AS program_name,
    p.created_at AS created_at
FROM users u
JOIN registrations p ON u.id = p.user_id;
```

Ekspor hasil query tersebut ke dalam format JSON array.

### Langkah 2: Tempatkan File JSON di Server
Simpan file hasil export tersebut pada path berikut:
```bash
/var/www/fitalenta/server/prisma/data/legacy-participants.json
```

*(Opsional)* Jika ada berkas foto/sertifikat lama yang ingin dipindahkan:
Salin berkas dari `storage/app/public/...` pada sistem lama ke `/var/www/fitalenta/server/uploads/registrations/`.

### Langkah 3: Eksekusi Skrip Migrasi
Jalankan skrip migrasi data peserta:
```bash
cd /var/www/fitalenta/server
npm run migrate:participants
```

Skrip ini otomatis:
1. Membaca data dari `legacy-participants.json`.
2. Membuat/memperbarui akun user peserta (`role: "user"`).
3. Membuat record registrasi dengan kode pendaftaran unik.
4. Menginisialisasi tahap `selection_status` dan `placement_status`.
5. Memberikan password awal seragam ke setiap akun yang dimigrasi.

---

## 7. Fitur Reset Password Seragam Peserta Pasca-Migrasi

Sesuai kebutuhan, semua peserta lama diberikan satu password baru yang seragam agar mempermudah transisi akun ke sistem baru.

1. Tentukan password seragam yang diinginkan pada `server/.env`:
   ```env
   DEFAULT_PARTICIPANT_PASSWORD=Fitalenta2026!
   ```
2. Jalankan perintah reset password massal:
   ```bash
   cd /var/www/fitalenta/server
   npm run reset:passwords
   ```
3. **Hasil:**
   - Seluruh akun peserta (`role: "user"`) password-nya akan di-hash ulang menggunakan bcrypt dengan password seragam tersebut.
   - Akun Admin dan Editor **tidak** tersentuh.
4. **Instruksi untuk Peserta:**
   Informasikan kepada peserta:
   > *"Gunakan email terdaftar Anda dan password sementara: `Fitalenta2026!` untuk masuk ke website fitalenta.co.id. Setelah berhasil login, disarankan segera mengubah password pada menu Profil."*

---

## 8. Konfigurasi Nginx & Subdomain

Karena sebelumnya menggunakan domain `fitalenta.co.id` dan subdomain `registrasi.fitalenta.co.id`, Nginx dikonfigurasi agar menangani keduanya secara mulus.

Buat file konfigurasi Nginx:
```bash
sudo nano /etc/nginx/sites-available/fitalenta.conf
```

Isi konfigurasi berikut:

```nginx
# 1. Penanganan Subdomain registrasi.fitalenta.co.id
# Otomatis mengarahkan (redirect 301) ke halaman pendaftaran di domain utama
server {
    listen 80;
    listen [::]:80;
    server_name registrasi.fitalenta.co.id;
    return 301 https://fitalenta.co.id/pendaftaran;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name registrasi.fitalenta.co.id;

    # Path sertifikat SSL
    ssl_certificate /etc/letsencrypt/live/fitalenta.co.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/fitalenta.co.id/privkey.pem;

    return 301 https://fitalenta.co.id/pendaftaran;
}

# 2. Domain Utama: fitalenta.co.id
server {
    listen 80;
    listen [::]:80;
    server_name fitalenta.co.id www.fitalenta.co.id;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name fitalenta.co.id www.fitalenta.co.id;

    ssl_certificate /etc/letsencrypt/live/fitalenta.co.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/fitalenta.co.id/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Batas ukuran upload berkas (KTP, bukti bayar, foto)
    client_max_body_size 25M;

    # A. API Backend Express (Port 5000)
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # B. Berkas Statis Unggahan (/uploads)
    location /uploads/ {
        alias /var/www/fitalenta/server/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # C. Frontend Next.js (Port 3000)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktifkan konfigurasi dan restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/fitalenta.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Pasang SSL Let's Encrypt jika belum:
```bash
sudo certbot --nginx -d fitalenta.co.id -d www.fitalenta.co.id -d registrasi.fitalenta.co.id
```

---

## 9. Manajemen Proses dengan PM2

Buat file konfigurasi PM2 di root proyek:
`/var/www/fitalenta/ecosystem.config.cjs`

```javascript
module.exports = {
  apps: [
    {
      name: "fitalenta-backend",
      cwd: "./server",
      script: "dist/index.js",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
    {
      name: "fitalenta-frontend",
      cwd: "./client",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
```

Jalankan kedua aplikasi dengan PM2:
```bash
cd /var/www/fitalenta
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Untuk memantau log dan status:
```bash
pm2 status
pm2 logs
pm2 restart all
```

---

## 10. Prosedur Pembaruan Aplikasi (Redeploy) di Masa Depan

Setiap ada update kode dari git repository, jalankan langkah berikut di server:

```bash
cd /var/www/fitalenta

# 1. Tarik pembaruan kode
git pull origin main

# 2. Build Backend
cd server
npm install
npm run prisma:generate
npx prisma migrate deploy
npm run build

# 3. Build Frontend
cd ../client
npm install
npm run build

# 4. Reload PM2 tanpa downtime
cd /var/www/fitalenta
pm2 reload ecosystem.config.cjs
```
