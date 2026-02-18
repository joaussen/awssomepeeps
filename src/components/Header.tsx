export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
        <a href="https://awssome.io" className="flex items-center gap-2">
          <img src="/smiley.svg" alt="" className="h-7 w-7" />
          <img
            src="/awssome-logo.png"
            alt="Awssome"
            className="h-5"
            style={{ filter: 'brightness(0)' }}
          />
        </a>

        <div className="flex-1" />

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          <a href="https://awssome.io" className="hover:text-gray-900 transition-colors">Home</a>
          <a href="https://awssome.io/about" className="hover:text-gray-900 transition-colors">About</a>
          <a href="https://awssome.io/partners" className="hover:text-gray-900 transition-colors">Partners</a>
        </nav>
      </div>
    </header>
  )
}
