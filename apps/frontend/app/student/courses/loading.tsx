export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse h-10 w-1/3 bg-gray-200 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
      <div className="h-96 bg-gray-200 rounded animate-pulse mt-8" />
    </div>
  );
} 