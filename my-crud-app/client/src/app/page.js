"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
    const API_URL = 'http://127.0.0.1:5000/api/items';

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const res = await axios.get(API_URL);
                if (isMounted) setItems(res.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [refreshTrigger]);

    const addItem = async () => {
        if (!title.trim()) return;
        try {
            await axios.post(API_URL, { title });
            setTitle('');
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error("Add error:", error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        // Added text-white to the main wrapper
        <div className="p-10 max-w-2xl mx-auto min-h-screen bg-[#0f172a] text-white">
            
            <h1 className="text-5xl font-extrabold mb-10 text-white tracking-tight">
                Task Manager <span className="text-blue-500">v1</span>
            </h1>
            
            <div className="flex gap-3 mb-10">
                <input 
                    className="border-2 border-slate-700 bg-slate-800 p-4 flex-1 rounded-xl text-white text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-500" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Type a new task here..."
                />
                <button 
                    onClick={addItem} 
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all active:scale-95"
                >
                    Add Task
                </button>
            </div>

            <div className="space-y-4">
                {items.length === 0 && (
                    <div className="text-center py-20 bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-700">
                        <p className="text-slate-400 text-xl">Your task list is empty.</p>
                    </div>
                )}
                
                {items.map(item => (
                    <div 
                        key={item._id} 
                        className="flex justify-between items-center bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm hover:border-slate-600 transition-all"
                    >
                        {/* Explicit text-white on the task title */}
                        <span className="text-xl font-medium text-white">{item.title}</span>
                        
                        <button 
                            onClick={() => deleteItem(item._id)} 
                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-5 py-2 rounded-lg font-bold transition-all border border-red-500/20"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}