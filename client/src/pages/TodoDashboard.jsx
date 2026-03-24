import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import todoApi from '../api/todoApi';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { kucing, kerja1, kerja2 } from "../assets";

function TodoDashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Ambil profil sederhana user dari localStorage (disimpan dari halaman login tadi)
  const userData = JSON.parse(localStorage.getItem('user')) || { username: 'Tamu', role: 'user' };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const loadTodos = async () => {
    try {
      setLoading(true);
      const response = await todoApi.getAll();
      setTodos(response.data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout(); // Token kedaluwarsa, paksa keluar!
      } else {
        setError('Gagal memuat tugas. Server bermasalah?');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTodo = async (title) => {
    try {
      await todoApi.create(title);
      loadTodos();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menambahkan tugas');
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      await todoApi.update(id, { completed });
      loadTodos();
    } catch (err) {
      alert('Gagal mengubah status tugas');
    }
  };

  const handleUpdateTitle = async (id, title) => {
    try {
      await todoApi.update(id, { title });
      loadTodos();
    } catch (err) {
      alert(err.response?.data?.message || 'Akses Ditolak');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoApi.delete(id);
      loadTodos();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus tugas');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"></div>

      {/* HEADER NAVIGASI */}
      <nav className="w-full px-8 py-4 bg-white/5 border-b border-white/10 backdrop-blur-md flex justify-between items-center relative z-20">
        <div className="flex flex-col">
          <span className="font-bold text-xl drop-shadow-md">Halo, {userData.username}! 👋</span>
          <span className={`text-xs w-max px-2 py-0.5 mt-1 rounded-md font-bold uppercase ${userData.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
            ROLE: {userData.role}
          </span>
        </div>
        <div className="flex gap-4 items-center">
          {userData.role === 'admin' && (
            <Link to="/admin" className="px-5 py-2 bg-purple-500/10 hover:bg-purple-500 text-purple-400 hover:text-white border border-purple-500/30 rounded-xl transition-all font-bold flex items-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] active:scale-95 duration-300">
              <i className="fa-solid fa-shield-halved"></i> Panel Admin
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl transition-all font-semibold flex items-center gap-2 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] active:scale-95 duration-300"
          >
            <i className="fa-solid fa-right-from-bracket"></i> Keluar
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto pt-10 px-6 pb-32 relative z-10 w-full">

        <header className="mb-12 text-center relative flex items-center justify-center gap-6">
          <img src={kerja1} alt="cat-left" className="w-16 h-16 object-contain transition-all duration-300 hover:scale-125 hover:-translate-y-2 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]" />

          <div>
            <h1 className="text-5xl font-extrabold mb-4 pb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg">
              Aksi Hari Ini !
            </h1>
            <p className="text-gray-400 text-lg">Catat, Kerjakan, dan Nikmati Harimu.</p>
          </div>

          <img src={kerja2} alt="cat-right" className="w-16 h-16 object-contain scale-x-[-1] transition-all duration-300 hover:-translate-y-2 hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.7)]" />
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 py-4 px-5 rounded-2xl mb-8 flex items-center gap-3 backdrop-blur-md">
            <i className="fa-solid fa-triangle-exclamation"></i>
            {error}
          </div>
        )}

        <TodoForm onAdd={handleAddTodo} />

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-20 text-blue-400">
              <i className="fa-solid fa-circle-notch animate-spin text-5xl"></i>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-white/10 rounded-3xl bg-white/5 backdrop-blur-md shadow-inner transition-all hover:bg-white/10">
              <i className="fa-regular fa-clipboard text-6xl text-blue-400/50 mb-6 block drop-shadow-lg"></i>
              {userData.role === 'admin' ? (
                <p className="text-gray-300 text-xl font-medium">Buku tugas Global (semua user) masih kosong.</p>
              ) : (
                <p className="text-gray-300 text-xl font-medium">Buku tugas {userData.username} masih kosong.</p>
              )}
            </div>
          ) : (
            todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} onUpdateTitle={handleUpdateTitle} />
            ))
          )}
        </div>
      </div>

      {/* 🐱 Pixel Pet */}
      <div className="fixed bottom-4 left-0 w-full pointer-events-none z-50">
        <div className="relative w-full h-20">
          <img src={kucing} alt="pixel-cat" className="absolute w-16 h-16 object-contain" style={{ animation: "walk-horizontal 20s linear infinite, bounce 1.2s ease-in-out infinite" }} />
        </div>
      </div>
    </div>
  );
}

export default TodoDashboard;
