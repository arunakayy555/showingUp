import React, { useState } from 'react';
import { X, Clock, Plus, Trash2, Wind, Sun, Coffee, Sparkles } from 'lucide-react';
import { addReliefLog, deleteReliefLog, formatTime } from '../utils/storage';

const QUICK_RELIEF_TYPES = [
  { label: 'Posture alignment & release', icon: Wind },
  { label: 'Warm compress / gentle heat', icon: Sun },
  { label: 'Eye rest & shoulder drop', icon: Coffee },
  { label: 'Gentle mindful breathing', icon: Sparkles },
];

export function ReliefLogModal({ isOpen, onClose, reliefLogs, onUpdateLogs }) {
  if (!isOpen) return null;

  const [selectedType, setSelectedType] = useState(QUICK_RELIEF_TYPES[0].label);
  const [customNote, setCustomNote] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const updated = addReliefLog(selectedType, customNote.trim());
    onUpdateLogs(updated);
    setCustomNote('');
  };

  const handleDelete = (id) => {
    const updated = deleteReliefLog(id);
    onUpdateLogs(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-4xl p-6 md:p-8 shadow-2xl max-h-[90vh] flex flex-col cute-card border-2"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-main)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <span 
              className="font-macaron text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--accent)' }}
            >
              Session Check-in
            </span>
            <h2 className="text-3xl sm:text-4xl font-romantic tracking-wide font-normal leading-tight" style={{ color: 'var(--text-main)' }}>
              4-Hour Relief Log ☕
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2.5 cute-btn border"
            style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-color)' }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Clinical Note / Notice */}
        <div 
          className="my-4 rounded-3xl border-2 p-4 text-xs sm:text-sm font-gelato leading-relaxed flex items-start gap-3"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-color)',
          }}
        >
          <span className="text-xl">💡</span>
          <div>
            <p className="font-macaron font-bold text-sm" style={{ color: 'var(--text-main)' }}>
              Physiotherapy schedule notice
            </p>
            <p className="mt-0.5" style={{ color: 'var(--text-muted)' }}>
              This log is kept separate from your daily strengthening routine. Do not assume you must repeat the strengthening exercises every four hours. Follow your physiotherapist's prescribed schedule.
            </p>
          </div>
        </div>

        {/* Quick Log Form */}
        <form 
          onSubmit={handleAdd} 
          className="mb-4 p-4 rounded-3xl border-2 font-macaron"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-color)',
          }}
        >
          <label className="block text-xs sm:text-sm font-bold mb-2.5" style={{ color: 'var(--text-main)' }}>
            Record a 4-hour relief check-in:
          </label>
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            {QUICK_RELIEF_TYPES.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setSelectedType(item.label)}
                className="text-left text-xs sm:text-sm p-2.5 rounded-2xl border-2 transition-all flex items-center gap-2 cute-btn font-bold"
                style={{
                  backgroundColor: selectedType === item.label ? 'var(--bg-card)' : 'transparent',
                  borderColor: selectedType === item.label ? 'var(--accent)' : 'var(--border-color)',
                  color: selectedType === item.label ? 'var(--accent)' : 'var(--text-main)',
                  boxShadow: selectedType === item.label ? '0 2px 8px -1px var(--ring-color)' : 'none',
                }}
              >
                <item.icon className="h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Optional note (e.g. gentle stretch, warm cup)..."
              className="font-gelato flex-1 rounded-2xl border-2 px-3.5 py-2 text-xs sm:text-sm focus:outline-none font-semibold"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-main)',
              }}
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-xs cute-btn shrink-0"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>Log</span>
            </button>
          </div>
        </form>

        {/* History of relief logs */}
        <div className="flex-1 overflow-y-auto pr-1">
          <h3 className="font-macaron text-xs sm:text-sm font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-muted)' }}>
            Recorded Relief Sessions ({reliefLogs.length})
          </h3>

          {reliefLogs.length === 0 ? (
            <div className="font-gelato text-center py-6 text-xs sm:text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
              No relief sessions recorded yet today. Check in whenever you take a gentle 4-hour pause! 🌸
            </div>
          ) : (
            <div className="space-y-2.5">
              {reliefLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl border-2 cute-card"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-macaron text-sm font-bold" style={{ color: 'var(--text-main)' }}>
                        {log.type}
                      </span>
                      <span className="font-gelato inline-flex items-center gap-1 text-xs font-bold" style={{ color: 'var(--accent)' }}>
                        <Clock className="h-3 w-3" />
                        {log.timeFormatted || formatTime(log.timestamp)}
                      </span>
                    </div>
                    {log.note && (
                      <p className="font-gelato text-xs sm:text-sm font-medium mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>
                        {log.note}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="p-2 hover:opacity-80 transition-opacity cute-btn"
                    style={{ color: 'var(--text-muted)' }}
                    title="Delete entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
