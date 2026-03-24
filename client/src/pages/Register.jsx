import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authApi from '../api/authApi';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Menghapus 'role', karena penentuan role sekarang tugas Admin dari Panel Admin!
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await authApi.register(username, password);
      setSuccess(res.message); // Menampilkan pesan sukses pending!
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal, coba username lain');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white overflow-hidden relative selection:bg-purple-500/30">
      <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-4xl shadow-2xl backdrop-blur-xl relative z-10 hover:shadow-purple-500/10 transition-shadow duration-500">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <i className="fa-solid fa-user-plus text-4xl text-purple-400 drop-shadow-lg"></i>
          </div>
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text drop-shadow-lg mb-2">Buat Akun</h1>
          <p className="text-gray-400 font-medium">Bergabunglah dan atur harimu</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm text-center font-medium shadow-inner animate-pulse">{error}</div>}
        
        {/* Jika berhasil kirim formulir, tampilkan notif persetujuan & blokir form pendaftaran*/}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-6 rounded-2xl md:text-md text-sm text-center font-medium shadow-inner flex flex-col items-center gap-4 transition-all">
            <i className="fa-solid fa-hourglass-half text-4xl animate-bounce"></i>
            <span>{success}</span>
            <Link to="/login" className="w-full mt-2 py-3 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/50 rounded-xl font-bold transition-colors">Pergi ke Halaman Login</Link>
          </div>
        )}

        {!success && (
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2 ml-1 uppercase tracking-wider">Username Baru</label>
              <input 
                type="text" 
                value={username} onChange={e => setUsername(e.target.value)} required 
                className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-inner focus:bg-white/5" 
                placeholder="Username unikmu"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2 ml-1 uppercase tracking-wider">Password Rahasia</label>
              <input 
                type="password" 
                value={password} onChange={e => setPassword(e.target.value)} required 
                minLength="5"
                className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-inner focus:bg-white/5" 
                placeholder="Minimal 5 Karakter"
              />
            </div>
            <button 
              type="submit" disabled={loading}
              className="w-full py-4 mt-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transform hover:-translate-y-1 transition-all duration-300 active:scale-95 disabled:opacity-70 flex justify-center items-center tracking-wide"
            >
              {loading ? <i className="fa-solid fa-spinner animate-spin text-xl"></i> : 'KIRIM FORMULIR'}
            </button>
          </form>
        )}
        
        {!success && (
          <p className="text-center text-gray-400 mt-8">
            Sudah terdaftar? <Link to="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors border-b border-transparent hover:border-purple-400 pb-1">Login di sini</Link>
          </p>
        )}
      </div>
    </div>
  );
}
export default Register;
