import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Cegah input kosong

    setLoading(true);
    await onAdd(title);
    setTitle('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-10 relative z-10">
      <input
        type="text"
        placeholder="Apa yang harus kamu kerjakan."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading ? (
          <i className="fa-solid fa-spinner animate-spin"></i>
        ) : (
          <><i className="fa-solid fa-plus font-bold"></i> Tambahkan</>
        )}
      </button>
    </form>
  );
};

export default TodoForm;
