export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e6fbff] via-[#e0e8ff] to-[#e6fbff]" />
      <div className="absolute inset-0 animate-mesh-1 opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(255,183,0,0.12)_0%,transparent_70%)]" />
      </div>
      <div className="absolute inset-0 animate-mesh-2 opacity-30">
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(14,130,249,0.08)_0%,transparent_70%)]" />
      </div>
      <div className="absolute inset-0 animate-mesh-3 opacity-20">
        <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle,rgba(243,109,200,0.06)_0%,transparent_70%)]" />
      </div>
    </div>
  )
}
