import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdateTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  // Jika user membatalkan edit atau menekan Enter
  const handleUpdate = () => {
    if (newTitle.trim() !== todo.title) {
      onUpdateTitle(todo.id, newTitle);
    }
    setIsEditing(false);
  };

  return (
    <div 
      className={`group flex items-center justify-between p-5 mb-4 rounded-2xl transition-all duration-300 border backdrop-blur-md 
        ${todo.completed 
        ? 'bg-white/5 border-white/5 opacity-50 grayscale hover:grayscale-0' 
        : 'bg-white/10 border-white/10 hover:bg-white/20 hover:shadow-2xl shadow-black/20 hover:-translate-y-1'}`}
    >
      <div className="flex items-center gap-5 flex-1 cursor-pointer">
        {/* Checkbox Cantik */}
        <button 
          onClick={() => onToggle(todo.id, !todo.completed)}
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 
            ${todo.completed ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'border-gray-500 hover:border-emerald-400'}`}
        >
          {todo.completed && <i className="fa-solid fa-check text-white text-sm scale-in"></i>}
        </button>

        {/* Teks Judul Interaktif (Klik 2x untuk Edit) */}
        {isEditing ? (
          <input 
            type="text" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
            autoFocus
            className="flex-1 bg-black/40 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 border border-blue-500/50 shadow-inner"
          />
        ) : (
          <span 
            onDoubleClick={() => setIsEditing(true)}
            className={`flex-1 text-lg font-medium transition-all duration-300 select-none 
              ${todo.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* Tombol Hapus: Hanya muncul saat di-Hover (pada Desktop) */}
      <button 
        onClick={() => onDelete(todo.id)}
        className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-300 flex items-center justify-center scale-90 hover:scale-100 ml-4"
        title="Hapus Tugas"
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};

export default TodoItem;
