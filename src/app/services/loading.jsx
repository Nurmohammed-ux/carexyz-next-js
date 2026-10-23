export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-base-200/40 animate-pulse">
      {/* Hero Header Skeleton */}
      <div className="pt-16 pb-6 px-6 lg:px-8 text-center max-w-2xl mx-auto">
        <div className="h-10 w-3/4 bg-base-300 rounded-lg mx-auto" />
        <div className="h-5 w-full bg-base-300 rounded-md mx-auto mt-6" />
        <div className="h-5 w-2/3 bg-base-300 rounded-md mx-auto mt-2" />
      </div>

      {/* Services Grid Skeleton */}
      <div className="px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-base-100 shadow-md border border-base-200 rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Card Image Skeleton */}
              <div className="h-52 w-full bg-base-300" />

              {/* Card Body Skeleton */}
              <div className="p-6 space-y-4">
                <div className="h-6 w-3/4 bg-base-300 rounded-md" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-base-300 rounded-md" />
                  <div className="h-4 w-5/6 bg-base-300 rounded-md" />
                </div>

                {/* Features Skeleton */}
                <div className="space-y-2 pt-2">
                  <div className="h-3 w-1/2 bg-base-300 rounded-md" />
                  <div className="h-3 w-2/3 bg-base-300 rounded-md" />
                </div>

                {/* Card Actions Skeleton */}
                <div className="pt-4 border-t border-base-200 grid grid-cols-2 gap-3">
                  <div className="h-9 w-full bg-base-300 rounded-lg" />
                  <div className="h-9 w-full bg-base-300 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}