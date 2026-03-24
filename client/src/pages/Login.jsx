import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authApi from '../api/authApi';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authApi.login(username, password);
      // Simpan Token & Data User di Local Storage
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/'); // Lempar user kembali ke Dashboard!
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal tersambung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white overflow-hidden relative selection:bg-blue-500/30">
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[2rem] shadow-2xl backdrop-blur-xl relative z-10 hover:shadow-blue-500/10 transition-shadow duration-500">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <i className="fa-solid fa-bolt text-4xl text-blue-400 drop-shadow-lg"></i>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-2">Selamat Datang</h1>
          <p className="text-gray-400 font-medium">Masuk untuk mengelola tugasmu</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm text-center font-medium shadow-inner animate-pulse">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2 ml-1 uppercase tracking-wider">Username</label>
            <input 
              type="text" 
              value={username} onChange={e => setUsername(e.target.value)} required 
              className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner focus:bg-white/5" 
              placeholder="Ketik username Anda"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2 ml-1 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              value={password} onChange={e => setPassword(e.target.value)} required 
              className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner focus:bg-white/5" 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" disabled={loading}
            className="w-full py-4 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transform hover:-translate-y-1 transition-all duration-300 active:scale-95 disabled:opacity-70 flex justify-center items-center tracking-wide"
          >
            {loading ? <i className="fa-solid fa-spinner animate-spin text-xl"></i> : 'MASUK SEKARANG'}
          </button>
        </form>
        
        <p className="text-center text-gray-400 mt-8">
          Belum punya akun? <Link to="/register" className="text-blue-400 hover:text-blue-300 font-bold transition-colors border-b border-transparent hover:border-blue-400 pb-1">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
