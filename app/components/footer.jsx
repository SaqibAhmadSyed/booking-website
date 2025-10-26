export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-56 right-0 bg-white border-t border-slate-200 z-50">
      <div className="flex flex-col items-center justify-center py-6 text-sm text-gray-600 text-center space-y-1">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Concordia Booking System</span>
          <span className="hidden md:inline">•</span>
          <span>{year}</span>
        </div>
      </div>
    </footer>
  );
}
