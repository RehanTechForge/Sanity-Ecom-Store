export function CartItemSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 border-b border-gray-200 pb-4 md:grid-cols-[2fr,1fr,1fr] md:items-center animate-pulse">
      <div className="flex gap-4">
        <div className="h-42 w-28 flex-shrink-0 bg-gray-200 rounded-none" />
        <div className="space-y-2 flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
      <div className="flex items-center justify-start md:justify-center">
        <div className="bg-gray-200 h-12 w-full lg:w-32 rounded" />
      </div>
      <div className="flex justify-end">
        <div className="h-6 bg-gray-200 rounded w-24" />
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-6 font-satoshi">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div className="h-10 bg-gray-200 rounded w-48 animate-pulse" />
        </div>

        <div className="mb-8 hidden grid-cols-[2fr,1fr,1fr] gap-4 md:grid">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-20 mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-20 ml-auto" />
        </div>

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <CartItemSkeleton key={i} />
          ))}
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-end space-y-4">
            <div className="flex gap-4 items-center">
              <div className="h-6 bg-gray-200 rounded w-20" />
              <div className="h-8 bg-gray-200 rounded w-32" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-64" />
            <div className="flex gap-4 w-full sm:w-auto">
              <div className="h-12 bg-gray-200 rounded w-40" />
              <div className="h-12 bg-gray-200 rounded w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
