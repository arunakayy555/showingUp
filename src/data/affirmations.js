export const AFFIRMATIONS = [
  {
    id: 1,
    text: "Consistency is how I turn five minutes of care into a lasting habit.",
    category: "Consistency",
    priority: true,
  },
  {
    id: 2,
    text: "I don't have to feel motivated. I just have to begin.",
    category: "Starting Small",
    priority: true,
  },
  {
    id: 3,
    text: "Every time I show up for myself, I make it easier to show up again.",
    category: "Showing Up",
    priority: true,
  },
  {
    id: 4,
    text: "Five minutes today is better than another day of putting it off.",
    category: "Consistency",
    priority: false,
  },
  {
    id: 5,
    text: "I am not doing this to tick a box. I am doing this for the life I want to get back to.",
    category: "Future Self",
    priority: true,
  },
  {
    id: 6,
    text: "My violin is worth showing up for, even on the days when motivation is missing.",
    category: "Violin",
    priority: true,
  },
  {
    id: 7,
    text: "Small, repeated efforts matter more than occasional bursts of determination.",
    category: "Consistency",
    priority: true,
  },
  {
    id: 8,
    text: "I deserve the care I keep postponing.",
    category: "Self-Care",
    priority: false,
  },
  {
    id: 9,
    text: "I cannot control how quickly I recover, but I can build consistency in following my care routine.",
    category: "Grounded Care",
    priority: true,
  },
  {
    id: 10,
    text: "I am building a habit, not trying to prove my willpower.",
    category: "Self-Discipline",
    priority: true,
  },
  {
    id: 11,
    text: "The five minutes I spend caring for myself today are an investment in my future.",
    category: "Future Self",
    priority: true,
  },
  {
    id: 12,
    text: "I don't need a perfect streak. I need to keep returning to the habit.",
    category: "Returning",
    priority: true,
  },
  {
    id: 13,
    text: "Discipline is not forcing myself to ignore my body. It is following through with the care I have been prescribed.",
    category: "Self-Discipline",
    priority: true,
  },
  {
    id: 14,
    text: "Every completed session is one more time I chose to take care of myself.",
    category: "Showing Up",
    priority: false,
  },
  {
    id: 15,
    text: "I want to play my violin again. Today, I can take one small step towards that goal.",
    category: "Violin",
    priority: true,
  },
];

/**
 * Returns a stable daily affirmation index based on the date string (YYYY-MM-DD).
 * Gives slight weighted priority to violin, consistency, self-discipline, and future self.
 */
export function getDailyAffirmationIndex(dateStr) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  return positiveHash % AFFIRMATIONS.length;
}
