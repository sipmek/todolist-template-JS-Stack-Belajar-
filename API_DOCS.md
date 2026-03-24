# Dokumentasi API To-Do List 📝

Aplikasi To-Do List ini menggunakan arsitektur RESTful API.
**Base URL:** `http://localhost:5000/api/todos`

---

## 1. Mendaftar Semua To-Do
Mengambil seluruh daftar To-Do yang ada di database, diurutkan dari yang terbaru.

- **Method:** `GET`
- **Endpoint:** `/`
- **URL Penuh:** `http://localhost:5000/api/todos`
- **Body Request:** (Kosong)

**Contoh Response Sukses (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "Belajar Express dan Sequelize",
      "completed": false,
      "createdAt": "2026-03-24T10:00:00.000Z",
      "updatedAt": "2026-03-24T10:00:00.000Z"
    }
  ],
  "message": "Berhasil mendapatkan daftar to-do."
}
```

---

## 2. Membuat To-Do Baru
Menambahkan daftar kegiatan (To-Do) baru ke database.

- **Method:** `POST`
- **Endpoint:** `/`
- **URL Penuh:** `http://localhost:5000/api/todos`
- **Body Request (JSON):**
```json
{
  "title": "Beli kopi di minimarket"
}
```

**Contoh Response Sukses (201 Created):**
```json
{
  "status": "success",
  "data": {
    "id": 2,
    "title": "Beli kopi di minimarket",
    "completed": false,
    "createdAt": "2026-03-24T12:00:00.000Z",
    "updatedAt": "2026-03-24T12:00:00.000Z"
  },
  "message": "To-do 'Beli kopi di minimarket' berhasil direkam ke database."
}
```

---

## 3. Memperbarui To-Do (Update)
Mengubah nama/teks kegiatan ATAU mencentang kegiatan menjadi selesai (`completed: true`).

- **Method:** `PUT`
- **Endpoint:** `/:id`  *(ganti `:id` dengan angka ID To-Do yang ingin diubah)*
- **URL Penuh:** `http://localhost:5000/api/todos/2`
- **Body Request (JSON):**
```json
{
  "title": "Beli kopi Excelso",
  "completed": true
}
```
*(Catatan: Anda bisa mengirim `title` saja, atau `completed` saja).*

**Contoh Response Sukses (200 OK):**
```json
{
  "status": "success",
  "data": {
    "id": 2,
    "title": "Beli kopi Excelso",
    "completed": true,
    "createdAt": "2026-03-24T12:00:00.000Z",
    "updatedAt": "2026-03-24T12:15:00.000Z"
  },
  "message": "To-do berhasil diperbarui."
}
```

---

## 4. Menghapus To-Do
Menghapus kegiatan dari database secara permanen.

- **Method:** `DELETE`
- **Endpoint:** `/:id` *(ganti `:id` dengan angka ID To-Do yang ingin dihapus)*
- **URL Penuh:** `http://localhost:5000/api/todos/2`
- **Body Request:** (Kosong)

**Contoh Response Sukses (200 OK):**
```json
{
  "status": "success",
  "data": null,
  "message": "To-do berhasil dihapus dari database."
}
```
