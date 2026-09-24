// Filigrana dourada usada sob alguns títulos, no espírito dos ornamentos de flash de tatuagem.
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`ornament ${className}`}
      viewBox="0 0 140 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M2 10h42c6 0 8-6 14-6 4 0 6 3 6 6" />
      <path d="M44 10c6 0 8 6 14 6 4 0 6-3 6-6" />
      <path d="M138 10H96c-6 0-8-6-14-6-4 0-6 3-6 6" />
      <path d="M96 10c-6 0-8 6-14 6-4 0-6-3-6-6" />
      <path d="M70 3.5l4.5 6.5-4.5 6.5-4.5-6.5z" fill="currentColor" stroke="none" />
    </svg>
  )
}
