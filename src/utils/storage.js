import { DEFAULT_EXERCISES } from '../data/defaultExercises';

const EXERCISES_KEY = 'suc_neck_exercises_v1';
const COMPLETIONS_KEY = 'suc_daily_completions_v1';
const RELIEF_LOGS_KEY = 'suc_four_hour_relief_logs_v1';
const SETTINGS_KEY = 'suc_user_settings_v1';

export function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDateLabel(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

// Exercises management (editable in settings)
export function getSavedExercises() {
  try {
    const raw = localStorage.getItem(EXERCISES_KEY);
    if (!raw) return DEFAULT_EXERCISES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_EXERCISES;
  } catch (e) {
    return DEFAULT_EXERCISES;
  }
}

export function saveExercises(exercises) {
  try {
    localStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
  } catch (e) {
    console.error('Failed to save exercises:', e);
  }
}

export function resetExercisesToDefault() {
  try {
    localStorage.removeItem(EXERCISES_KEY);
    return DEFAULT_EXERCISES;
  } catch (e) {
    return DEFAULT_EXERCISES;
  }
}

// Daily Completions
export function getAllCompletions() {
  try {
    const raw = localStorage.getItem(COMPLETIONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function getTodayRecord(exercises = DEFAULT_EXERCISES) {
  const today = getTodayKey();
  const all = getAllCompletions();
  
  if (all[today]) {
    // Ensure all current exercise ids exist in today's record
    const record = { ...all[today] };
    if (!record.items) record.items = {};
    
    exercises.forEach(ex => {
      if (!record.items[ex.id]) {
        record.items[ex.id] = {
          completedSets: 0,
          isFullyDone: false,
          completedAt: null,
          setTimes: []
        };
      }
    });
    return record;
  }

  // Create clean initial record for today without touching older days
  const initialItems = {};
  exercises.forEach(ex => {
    initialItems[ex.id] = {
      completedSets: 0,
      isFullyDone: false,
      completedAt: null,
      setTimes: []
    };
  });

  return {
    date: today,
    completedAllAt: null,
    items: initialItems,
  };
}

export function saveTodayRecord(record) {
  try {
    const today = getTodayKey();
    const all = getAllCompletions();
    all[today] = {
      ...record,
      date: today,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save today record:', e);
  }
}

// Four-Hour Relief Session Log (explicitly separate from strengthening routine)
export function getReliefLogs() {
  try {
    const raw = localStorage.getItem(RELIEF_LOGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function addReliefLog(type = 'Gentle relief break', note = '') {
  try {
    const logs = getReliefLogs();
    const now = new Date();
    const newEntry = {
      id: 'relief_' + Date.now(),
      timestamp: now.toISOString(),
      date: getTodayKey(),
      timeFormatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      note
    };
    logs.unshift(newEntry);
    localStorage.setItem(RELIEF_LOGS_KEY, JSON.stringify(logs));
    return logs;
  } catch (e) {
    return [];
  }
}

export function deleteReliefLog(id) {
  try {
    const logs = getReliefLogs().filter(log => log.id !== id);
    localStorage.setItem(RELIEF_LOGS_KEY, JSON.stringify(logs));
    return logs;
  } catch (e) {
    return [];
  }
}

// User Settings
export function getSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : { soundEnabled: true, showPacer: true };
  } catch (e) {
    return { soundEnabled: true, showPacer: true };
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}
