export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="20" fill="#2196F3" />
      <path d="M30 70V30h40v40H30z" fill="white" fillRule="evenodd" />
    </svg>
  )
}

