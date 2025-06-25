export default function Loading() {
    return (
      <div className="space-y-6">
        <div className="animate-pulse h-10 w-1/3 bg-gray-200 rounded" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  } 