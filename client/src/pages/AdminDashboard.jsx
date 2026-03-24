import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import adminApi from '../api/adminApi';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Pastikan yang masuk sini benar-benar Admin dari localStorage
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!userData || userData.role !== 'admin') {
      navigate('/'); // Tendang balik ke beranda jika bukan admin nyasar
    } else {
      loadUsers();
    }
  // eslint-disable-next-line
  }, [navigate]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getUsers();
      setUsers(res.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Gagal memuat daftar pendaftar/pengguna.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await adminApi.updateUser(id, { status: newStatus });
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengubah status');
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      await adminApi.updateUser(id, { role: newRole });
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal merubah role');
    }
  };

  const handleDeleteUser = async (id) => {
    if(!window.confirm('YAKIN INGIN MENGHAPUS AKUN INI PERMANEN?')) return;
    try {
      await adminApi.deleteUser(id);
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus akun');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-x-hidden selection:bg-purple-500/30 pb-20">
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"></div>
      
      <nav className="w-full px-8 py-4 bg-white/5 border-b border-white/10 backdrop-blur-md flex justify-between items-center relative z-20">
        <div className="flex items-center gap-4">
          <Link to="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-semibold flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Beranda To-Do
          </Link>
          <span className="font-bold text-xl drop-shadow-md text-cyan-400 bg-black/20 px-4 py-1.5 rounded-xl border border-white/5">
            <i className="fa-solid fa-shield-halved text-purple-400 mr-2"></i> Ruang Administrator Utama
          </span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto pt-10 px-6 relative z-10 w-full">
        {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-xl mb-6 shadow-md border border-red-500/20">{error}</div>}

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="p-6 border-b border-white/10 bg-black/30 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Data Pendaftar & Keanggotaan</h2>
            <button onClick={loadUsers} className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-md active:scale-95 flex justify-center items-center">
              <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-xs uppercase tracking-widest border-b border-white/5">
                  <th className="p-4 pl-6 font-semibold">Username</th>
                  <th className="p-4 font-semibold text-center">Status</th>
                  <th className="p-4 font-semibold text-center">Role Akses</th>
                  <th className="p-4 font-semibold text-center">Tindakan Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan="4" className="p-16 text-center"><i className="fa-solid fa-spinner animate-spin text-4xl text-blue-400/50"></i></td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan="4" className="p-10 text-center text-gray-400">Database Kosong.</td></tr>
                ) : (
                  users.map(u => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4 pl-6 font-medium text-lg flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs shadow-md">
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        {u.username}
                        {u.id === userData.id && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md text-gray-400 uppercase tracking-wide">Anda</span>}
                      </td>

                      <td className="p-4 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase shadow-sm ${
                          u.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          u.status === 'banned' ? 'bg-red-500/20 text-red-500 border border-red-500/30' :
                          'bg-amber-500/20 text-amber-500 border border-amber-500/30 animate-pulse'
                        }`}>
                          {u.status}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <select 
                          value={u.role} 
                          onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                          disabled={u.id === userData.id}
                          className={`bg-transparent outline-none cursor-pointer border-b pb-0.5 font-medium transition-colors ${u.role === 'admin' ? 'text-purple-400 border-purple-500/50 hover:border-purple-400' : 'text-blue-400 border-blue-500/50 hover:border-blue-400'} disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <option value="user" className="bg-slate-800 text-blue-400">Pegawai (User)</option>
                          <option value="admin" className="bg-slate-800 text-purple-400">Admin (Bos)</option>
                        </select>
                      </td>

                      <td className="p-4 flex gap-2 justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                        {u.status !== 'active' && (
                          <button onClick={() => handleUpdateStatus(u.id, 'active')} className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg transition-colors text-sm shadow-sm" title="Approve & Jadikan Active">
                            <i className="fa-solid fa-check"></i> ACC
                          </button>
                        )}
                        {u.status !== 'banned' && (
                          <button onClick={() => handleUpdateStatus(u.id, 'banned')} className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-white rounded-lg transition-colors text-sm shadow-sm opacity-50 hover:opacity-100" title="Banned Aksesnya">
                            <i className="fa-solid fa-ban"></i> Blok
                          </button>
                        )}
                        <button onClick={() => handleDeleteUser(u.id)} disabled={u.id === userData.id} className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors text-sm shadow-sm disabled:opacity-0" title="Hapus Permanen">
                          <i className="fa-solid fa-trash-can"></i> Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
