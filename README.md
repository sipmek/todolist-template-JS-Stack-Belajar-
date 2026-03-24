# 📝 Aplikasi To Do List

Aplikasi manajemen tugas (To Do List) dengan backend Express.js dan frontend React.js sebagai template saya sendiri belajar bersama AI & Github copilot.

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: React.js + Vite
- **Styling**: Tailwind CSS
- **Database**: [Sesuaikan dengan DB Anda]
- **Authentication**: JWT

---

## 📋 Persyaratan

Sebelum memulai, pastikan Anda sudah install:
- **Node.js** (v14 atau lebih tinggi) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **NPM** (biasanya sudah termasuk dengan Node.js)

Cek versi dengan:
```bash
node --version
npm --version
git --version
```

---

## 🚀 Cara Menggunakan Proyek Ini

### 1️⃣ Clone Repository dari GitHub

```bash
git clone https://github.com/YOUR_USERNAME/to-do-list.git
cd "to do list"
```

Ganti `YOUR_USERNAME` dengan username GitHub Anda.

---

### 2️⃣ Setup Backend

```bash
# Masuk ke folder backend (sudah di root)

# Install dependencies
npm install

# Buat file .env (konfigurasi environment)
# Buka .env dan atur konfigurasi database dan port
# Contoh:
# PORT=5000
# DB_HOST=localhost
# DB_NAME=todo_db

# Jalankan server backend
npm start
# atau gunakan npm run dev (jika ada script dev)
```

Server akan berjalan di: `http://localhost:5000` (atau port yang Anda atur)

---

### 3️⃣ Setup Frontend

Buka terminal baru, lalu:

```bash
# Masuk ke folder frontend /client

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Frontend akan berjalan di: `http://localhost:5173` (atau port yang ditampilkan di terminal)

---

## 📁 Struktur Project

```
to-do-list/
├── src/                          # Backend (Express.js)
│   ├── app.js                   # Express app configuration
│   ├── server.js                # Server entry point
│   ├── config/                  # Konfigurasi (database, dll)
│   ├── controllers/             # Logic handling request
│   ├── routes/                  # API routes
│   ├── models/                  # Database models
│   ├── middlewares/             # Middleware (auth, validation)
│   ├── services/                # Business logic
│   └── validations/             # Input validation
│
├── client/                       # Frontend (React.js + Vite)
│   ├── src/
│   │   ├── main.jsx            # Entry point
│   │   ├── App.jsx             # Main component
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── api/                # API calls
│   │   └── assets/             # Images, icons, dll
│   ├── public/                 # Static files
│   └── vite.config.js          # Vite configuration
│
├── package.json                 # Backend dependencies
├── README.md                    # File ini
└── .gitignore                   # File yang diabaikan Git
```

---

## 🔑 Fitur Utama

- ✅ Membuat tugas baru
- ✅ Edit tugas
- ✅ Hapus tugas
- ✅ Mark tugas sebagai completed
- ✅ User authentication
- ✅ Admin dashboard

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Daftar user baru
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Todo
- `GET /api/todos` - Ambil semua todo user
- `POST /api/todos` - Buat todo baru
- `PUT /api/todos/:id` - Edit todo
- `DELETE /api/todos/:id` - Hapus todo

### Admin
- `GET /api/admin/users` - Lihat semua users
- `GET /api/admin/todos` - Lihat semua todos

---

## 🔄 Workflow Git Harian

Saat Anda mengembangkan fitur baru:

### Membuat Fitur Baru
```bash
# 1. Buat branch baru
git checkout -b feature/nama-fitur
# Contoh: git checkout -b feature/add-due-date

# 2. Lakukan perubahan, lalu cek status
git status

# 3. Simpan perubahan
git add .
git commit -m "Add: deskripsi singkat perubahan"
# Contoh: git commit -m "Add: due date feature untuk todo"

# 4. Push ke GitHub
git push -u origin feature/nama-fitur
```

### Merge ke Main
```bash
# Buat Pull Request di GitHub UI, atau merge manual:
git checkout main
git pull origin main
git merge feature/nama-fitur
git push origin main

# Delete branch lokal
git branch -d feature/nama-fitur
```

---

## 🐛 Troubleshooting

### Error: Port sudah digunakan
Ubah port di `.env` atau file config:
```bash
# Ganti PORT=5000 menjadi PORT=5001 misalnya
```

### Error: Cannot find module
Pastikan sudah install dependencies:
```bash
npm install
```

### Frontend tidak connect ke Backend
Cek URL API di `client/src/api/apiClient.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000'; // Sesuaikan dengan port backend
```

---

## 📌 Tips Agar Tidak Lupa

1. **Selalu commit setelah selesai fitur**: `git commit -m "pesan deskriptif"`
2. **Pull sebelum mulai coding**: `git pull origin main`
3. **Jangan commit node_modules**: Sudah ada di .gitignore
4. **Update package**: `npm update` sesekali untuk dependency terbaru
5. **Buat branch untuk fitur baru**: Jangan langsung di main

---

## 📦 Versi

Current Version: **v0.1** (Beta)

---

## 👨‍💻 Author

Dibuat untuk pembelajaran JavaScript Full Stack

---

## 📝 License

MIT

---

**Happy Coding! 🎉**
