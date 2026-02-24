export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-blue-bg)] border-b border-gray-100 py-4">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
        <a href="https://awssome.io" className="flex items-center gap-2">
          <img
            src="/awssome-logo-white.png"
            alt="Awssome"
            className="max-w-[130px]"
          />
        </a>

        <div className="flex-1" />

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          <a href="https://awssome.io" target="_blank" rel="noopener noreferrer" className="text-white hover:underline transition-colors">Home</a>
          <a href="https://awssome.io/about-us" target="_blank" rel="noopener noreferrer" className="text-white hover:underline transition-colors">About</a>
          <a href="https://awssome.io/partners" target="_blank" rel="noopener noreferrer" className="text-white hover:underline transition-colors">Partners</a>
        </nav>
      </div>
    </header>
  )
}
