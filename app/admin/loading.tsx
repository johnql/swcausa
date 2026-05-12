export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b h-14" />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border rounded-2xl p-6 h-28 animate-pulse">
              <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
              <div className="h-8 w-16 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
        <div className="bg-white border rounded-2xl h-64 animate-pulse" />
      </div>
    </div>
  );
}
