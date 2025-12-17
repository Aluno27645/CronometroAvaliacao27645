import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-3 text-[#cdd6f4] uppercase tracking-wider">Cronómetros</h1>
          <p className="text-[#bac2de] text-sm">Sistema de gestão de tempo</p>
        </div>
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="block bg-[#cba6f7] hover:bg-[#b4befe] text-[#11111b] font-bold py-5 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-[#cba6f7]/50"
          >
            Controlo
          </Link>
          <Link
            href="/projection"
            className="block bg-[#313244] hover:bg-[#45475a] backdrop-blur-sm text-[#cdd6f4] font-semibold py-5 px-8 rounded-2xl transition-all border border-[#585b70]"
          >
            Projeção
          </Link>
        </div>
      </div>
    </div>
  );
}
