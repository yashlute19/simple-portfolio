"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

interface Entry {
  id: number;
  text: string;
  timestamp: string;
}

function formatTimestamp(ts: string): string {
  // Return as-is if it's already a relative string (not an ISO date)
  if (!ts.includes("T") && !ts.includes("-")) return ts;
  try {
    const date = new Date(ts);
    if (isNaN(date.getTime())) return ts;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    return `${diffDays}d ago`;
  } catch {
    return ts;
  }
}

const DEFAULT_ENTRIES: Entry[] = [
  {
    id: 2,
    text: "Just optimized the server-side rendering for the new portfolio module. The LCP improvement is night and day. Web vitals are the silent hero of UX.",
    timestamp: "2h ago",
  },
  {
    id: 1,
    text: "Experimenting with three.js shaders for the hero section. There's something hypnotic about procedurally generated light leaks.",
    timestamp: "Yesterday",
  },
];

export function ContentAdder() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [text, setText] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("portfolioUpdates");
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch {
        setEntries(DEFAULT_ENTRIES);
      }
    } else {
      setEntries(DEFAULT_ENTRIES);
      localStorage.setItem("portfolioUpdates", JSON.stringify(DEFAULT_ENTRIES));
    }
  }, []);

  const handlePost = () => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 500) return;

    const newEntry: Entry = {
      id: Date.now(),
      text: trimmed,
      timestamp: new Date().toISOString(),
    };

    const updated = [newEntry, ...entries].slice(0, 10);
    setEntries(updated);
    localStorage.setItem("portfolioUpdates", JSON.stringify(updated));
    setText("");
  };

  const handleDelete = (id: number) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("portfolioUpdates", JSON.stringify(updated));
  };

  const remaining = 500 - text.length;

  if (!isClient) return null;

  return (
    <section
      className="py-32 px-6 lg:px-24 relative"
      id="updates"
      style={{ backgroundColor: "#131313" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-3xl mb-16 border border-white/5"
        >
          <h3 className="font-headline text-3xl font-bold mb-8 flex items-center gap-3 text-white">
            <MessageSquare className="text-[#00dbe9]" size={28} />
            Quick Updates
          </h3>

          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-[#1c1b1b] border-b-2 border-white/10 focus:border-[#00dbe9] focus:outline-none text-white py-4 px-2 resize-none h-32 transition-all placeholder:text-neutral-600 font-body rounded-lg"
              maxLength={500}
              placeholder="What's on your mind? (Tech, Art, Philosophy...)"
            />
            <div className="flex justify-between items-center mt-4">
              <span
                className={`text-xs font-label tracking-widest uppercase ${
                  remaining < 50 ? "text-red-400" : "text-neutral-500"
                }`}
              >
                {text.length} / 500
              </span>
              <button
                onClick={handlePost}
                disabled={!text.trim() || text.length > 500}
                className="bg-[#00dbe9] text-[#002022] font-headline font-black px-10 py-3 rounded-xl hover:scale-105 transition-all text-sm uppercase disabled:opacity-50 disabled:hover:scale-100 cursor-pointer disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </motion.div>

        {/* Feed */}
        <div className="space-y-6">
          <AnimatePresence>
            {entries.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-neutral-500 py-12"
              >
                No updates yet. Share your first thought above!
              </motion.p>
            )}
            {entries.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx === 0 ? 0 : 0 }}
                className="glass-card p-8 rounded-2xl border-l-4 border-[#ffade5]/40 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-headline font-bold text-[#ffade5]">
                    Yash Lute
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-tighter">
                      {formatTimestamp(entry.timestamp)}
                    </span>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-600 hover:text-red-400"
                      aria-label="Delete entry"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-[#dcbed0] leading-relaxed break-words whitespace-pre-wrap">
                  {entry.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
