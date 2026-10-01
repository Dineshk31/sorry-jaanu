export default function Heart({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 32 30" aria-hidden="true" className={className} {...props}>
      <path
        fill="currentColor"
        d="M16 29S2 20.6 2 10.9C2 6 5.7 2 10.3 2c2.4 0 4.5 1.2 5.7 3.2C17.2 3.2 19.3 2 21.7 2 26.3 2 30 6 30 10.9 30 20.6 16 29 16 29z"
      />
    </svg>
  )
}
