import React from 'react';
import { X, Calendar, Sparkles } from 'lucide-react';
import { getAllCompletions, formatDateLabel, formatTime } from '../utils/storage';

export function HistoryModal({ isOpen, onClose, exercises }) {
  if (!isOpen) return null;

  const allCompletions = getAllCompletions();
  const sortedDates = Object.keys(allCompletions).sort((a, b) => b.localeCompare(a));

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
              Consistency Journal
            </span>
            <h2 className="text-3xl sm:text-4xl font-romantic tracking-wide font-normal leading-tight" style={{ color: 'var(--text-main)' }}>
              Completion History ✨
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

        <p className="font-gelato my-3.5 text-xs sm:text-sm font-semibold leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Checklists reset automatically each morning, while all past dates and timestamps stay safely archived here.
        </p>

        {/* History List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
          {sortedDates.length === 0 ? (
            <div className="font-gelato text-center py-8 text-xs sm:text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
              No previous completion records found yet. Completed routines will bloom here automatically! 🌸
            </div>
          ) : (
            sortedDates.map((dateStr) => {
              const record = allCompletions[dateStr];
              const items = record.items || {};
              const completedCount = Object.values(items).filter((i) => i.isFullyDone).length;
              const totalCount = exercises.length;
              const isAllDone = completedCount >= totalCount && totalCount > 0;

              return (
                <div
                  key={dateStr}
                  className="rounded-3xl border-2 p-4 sm:p-5 transition-all shadow-xs"
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderColor: isAllDone ? 'var(--accent)' : 'var(--border-color)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                      <span className="font-macaron text-sm sm:text-base font-bold" style={{ color: 'var(--text-main)' }}>
                        {formatDateLabel(dateStr)}
                      </span>
                    </div>

                    <span
                      className="font-gelato inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold shadow-xs"
                      style={{
                        backgroundColor: isAllDone ? 'var(--accent)' : 'var(--bg-card)',
                        color: isAllDone ? 'var(--accent-text)' : 'var(--text-main)',
                      }}
                    >
                      {completedCount} of {totalCount} completed
                    </span>
                  </div>

                  {record.completedAllAt && (
                    <div 
                      className="font-gelato mb-2.5 flex items-center gap-1.5 text-xs font-bold"
                      style={{ color: 'var(--accent)' }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Finished at {formatTime(record.completedAllAt)} 💖</span>
                    </div>
                  )}

                  {/* Individual exercises listed */}
                  <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                    {exercises.map((ex) => {
                      const itemData = items[ex.id];
                      const done = itemData?.isFullyDone;

                      return (
                        <div
                          key={ex.id}
                          className="flex items-center justify-between text-xs sm:text-sm py-0.5"
                        >
                          <span
                            className={`font-macaron truncate ${done ? 'font-bold' : 'opacity-65'}`}
                            style={{ color: 'var(--text-main)' }}
                          >
                            {ex.name}
                          </span>

                          <div className="flex items-center gap-2 shrink-0 font-gelato">
                            {done ? (
                              <span 
                                className="inline-flex items-center gap-1 text-xs font-bold"
                                style={{ color: 'var(--accent)' }}
                              >
                                <span>🌸</span>
                                <span>{itemData.completedAt ? formatTime(itemData.completedAt) : 'Done'}</span>
                              </span>
                            ) : (
                              <span className="text-xs opacity-50" style={{ color: 'var(--text-muted)' }}>
                                {itemData?.completedSets > 0 ? `Set ${itemData.completedSets}/${ex.sets}` : '—'}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Close Button */}
        <div className="pt-4 border-t-2 flex justify-end" style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={onClose}
            className="font-macaron rounded-full px-6 py-2 text-xs sm:text-sm font-bold cute-btn border-2"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
