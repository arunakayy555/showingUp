import React, { useState } from 'react';
import { X, Save, RotateCcw, Volume2, VolumeX, Check } from 'lucide-react';
import { DEFAULT_EXERCISES } from '../data/defaultExercises';
import { saveExercises, resetExercisesToDefault } from '../utils/storage';

export function SettingsModal({
  isOpen,
  onClose,
  exercises,
  onUpdateExercises,
  soundEnabled,
  onToggleSound,
}) {
  if (!isOpen) return null;

  const [editableExercises, setEditableExercises] = useState(
    exercises.map((ex) => ({ ...ex }))
  );
  const [saveStatus, setSaveStatus] = useState('');

  const handleNameChange = (index, newName) => {
    const updated = [...editableExercises];
    updated[index].name = newName;
    setEditableExercises(updated);
  };

  const handleSetsChange = (index, newSets) => {
    const updated = [...editableExercises];
    updated[index].sets = Math.max(1, parseInt(newSets, 10) || 1);
    setEditableExercises(updated);
  };

  const handleRepsChange = (index, newReps) => {
    const updated = [...editableExercises];
    updated[index].reps = Math.max(1, parseInt(newReps, 10) || 1);
    setEditableExercises(updated);
  };

  const handleSave = () => {
    saveExercises(editableExercises);
    onUpdateExercises(editableExercises);
    setSaveStatus('Prescribed routine updated ✨');
    setTimeout(() => {
      setSaveStatus('');
      onClose();
    }, 900);
  };

  const handleReset = () => {
    if (window.confirm('Reset all exercises back to your original prescribed physiotherapy routine?')) {
      const def = resetExercisesToDefault();
      setEditableExercises(def.map((ex) => ({ ...ex })));
      onUpdateExercises(def);
      setSaveStatus('Reset to default routine');
      setTimeout(() => setSaveStatus(''), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-xl rounded-4xl p-6 md:p-8 shadow-2xl max-h-[90vh] flex flex-col cute-card border-2"
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
              Routine Configuration
            </span>
            <h2 className="text-3xl sm:text-4xl font-romantic tracking-wide font-normal leading-tight" style={{ color: 'var(--text-main)' }}>
              Settings & Routine ⚙️
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

        {/* Notice */}
        <div 
          className="font-gelato my-4 rounded-3xl border-2 p-4 text-xs sm:text-sm leading-relaxed"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-color)',
          }}
        >
          <p className="font-macaron font-bold text-sm" style={{ color: 'var(--text-main)' }}>Physiotherapy routine adjustments</p>
          <p className="mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Use these controls only if your physiotherapist modifies your exercise names, sets, or repetitions.
          </p>
        </div>

        {/* Sound toggle preference */}
        <div 
          className="mb-4 flex items-center justify-between p-4 rounded-3xl border-2 shadow-xs"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="flex items-center gap-3.5">
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-2xl text-lg shadow-xs border"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--accent)',
              }}
            >
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </div>
            <div>
              <p className="font-macaron text-sm sm:text-base font-bold" style={{ color: 'var(--text-main)' }}>
                Soothing Audio Feedback
              </p>
              <p className="font-gelato text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                Soft bubbly pops on taps and peaceful completion sparkles
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleSound}
            className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors cute-btn"
            style={{ backgroundColor: soundEnabled ? 'var(--accent)' : 'var(--border-color)' }}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                soundEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Exercise editor table */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
          <h3 className="font-macaron text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Current Prescribed Exercises ({editableExercises.length})
          </h3>

          {editableExercises.map((ex, idx) => (
            <div
              key={ex.id || idx}
              className="p-4 rounded-3xl border-2 space-y-3 shadow-xs"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div>
                <label className="font-gelato block text-xs font-bold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  Exercise Name #{idx + 1}
                </label>
                <input
                  type="text"
                  value={ex.name}
                  onChange={(e) => handleNameChange(idx, e.target.value)}
                  className="font-macaron w-full rounded-2xl border-2 px-3.5 py-2 text-sm font-bold focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-main)',
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5 font-macaron">
                <div>
                  <label className="font-gelato block text-xs font-bold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    Sets
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={ex.sets}
                    onChange={(e) => handleSetsChange(idx, e.target.value)}
                    className="w-full rounded-2xl border-2 px-3.5 py-2 text-sm font-bold focus:outline-none"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-main)',
                    }}
                  />
                </div>
                <div>
                  <label className="font-gelato block text-xs font-bold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    Repetitions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={ex.reps}
                    onChange={(e) => handleRepsChange(idx, e.target.value)}
                    className="w-full rounded-2xl border-2 px-3.5 py-2 text-sm font-bold focus:outline-none"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-main)',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="pt-4 mt-2 border-t-2 flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
          <button
            type="button"
            onClick={handleReset}
            className="font-macaron inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold cute-btn hover:opacity-80"
            style={{ color: 'var(--text-muted)' }}
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset to prescribed defaults</span>
          </button>

          <div className="flex items-center gap-2">
            {saveStatus && (
              <span className="font-gelato inline-flex items-center gap-1 text-xs sm:text-sm font-bold animate-fade-in" style={{ color: 'var(--accent)' }}>
                <Check className="h-4 w-4 stroke-[3]" />
                {saveStatus}
              </span>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="font-macaron inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs cute-btn"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Save className="h-4 w-4" />
              <span>Save Routine</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
