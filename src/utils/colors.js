// Premium color palette for tags
export const tagColors = [
  'text-sky-400/80 border-sky-400/20 bg-sky-400/5 hover:border-sky-400/40',
  'text-violet-400/80 border-violet-400/20 bg-violet-400/5 hover:border-violet-400/40',
  'text-emerald-400/80 border-emerald-400/20 bg-emerald-400/5 hover:border-emerald-400/40',
  'text-pink-400/80 border-pink-400/20 bg-pink-400/5 hover:border-pink-400/40',
  'text-amber-400/80 border-amber-400/20 bg-amber-400/5 hover:border-amber-400/40',
  'text-rose-400/80 border-rose-400/20 bg-rose-400/5 hover:border-rose-400/40',
  'text-indigo-400/80 border-indigo-400/20 bg-indigo-400/5 hover:border-indigo-400/40',
  'text-teal-400/80 border-teal-400/20 bg-teal-400/5 hover:border-teal-400/40',
]

/**
 * Simple hash function to get a consistent color from string
 * @param {string} text - The tag text
 * @param {number} index - Optional index to ensure variety
 * @returns {string} - TailWind CSS classes for consistent coloring
 */
export const getTagColor = (text, index = 0) => {
  if (!text) return tagColors[0]
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash)
  }
  // Mix in the index to push color selection further
  return tagColors[Math.abs(hash + index) % tagColors.length]
}
