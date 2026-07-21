export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060809] flex items-center justify-center text-white">
      <div className="text-center">
        <div className="text-6xl font-black text-orange-500 mb-4">404</div>
        <p className="text-zinc-400">Page not found</p>
        <a href="/" className="mt-6 inline-block text-orange-500 hover:underline">← Back</a>
      </div>
    </div>
  )
}
