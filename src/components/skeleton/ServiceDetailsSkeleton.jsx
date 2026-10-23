export default function ServiceDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-base-200/40">
      <main className="py-8">
        <div className="px-6 lg:px-8 animate-pulse">
          {/* Back Button Skeleton */}
          <div className="h-5 w-32 bg-base-300 rounded-md mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
            {/* Left Column: Image & Details Skeletons */}
            <div className="space-y-8">
              {/* Main Image Banner Skeleton */}
              <div className="relative h-122.5 w-full rounded-[2.5rem] bg-base-300 overflow-hidden shadow-md">
                <div className="absolute bottom-6 left-6 right-6 space-y-3">
                  <div className="h-6 w-24 bg-base-100/40 rounded-full" />
                  <div className="h-10 w-3/4 bg-base-100/50 rounded-lg" />
                </div>
              </div>

              {/* Description Box Skeleton */}
              <div className="bg-base-100 p-6 sm:p-8 rounded-3xl shadow-xs border border-base-200 space-y-4">
                <div className="h-6 w-48 bg-base-300 rounded-md" />
                <div className="h-16 w-full bg-base-200 rounded-2xl" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full bg-base-300 rounded-md" />
                  <div className="h-4 w-5/6 bg-base-300 rounded-md" />
                </div>
              </div>

              {/* Features List Skeleton */}
              <div className="bg-base-100 p-6 sm:p-8 rounded-3xl shadow-xs border border-base-200 space-y-6">
                <div className="h-6 w-56 bg-base-300 rounded-md" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-12 w-full bg-base-200 rounded-2xl"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Booking Box Skeleton */}
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="bg-base-100 p-6 sm:p-8 rounded-3xl shadow-xl border border-base-200 space-y-6">
                {/* Price Skeleton */}
                <div className="text-center pb-6 border-b border-base-200 space-y-2">
                  <div className="h-3 w-20 bg-base-300 rounded-md mx-auto" />
                  <div className="h-10 w-36 bg-base-300 rounded-lg mx-auto" />
                </div>

                {/* Ideal For Skeleton */}
                <div className="py-4 border-b border-base-200 space-y-3">
                  <div className="h-3 w-28 bg-base-300 rounded-md" />
                  <div className="flex flex-wrap gap-2">
                    <div className="h-8 w-24 bg-base-300 rounded-full" />
                    <div className="h-8 w-28 bg-base-300 rounded-full" />
                  </div>
                </div>

                {/* Availability Skeleton */}
                <div className="py-4 border-b border-base-200 space-y-3">
                  <div className="h-3 w-32 bg-base-300 rounded-md" />
                  <div className="flex flex-wrap gap-2">
                    <div className="h-8 w-20 bg-base-300 rounded-full" />
                    <div className="h-8 w-24 bg-base-300 rounded-full" />
                  </div>
                </div>

                {/* Trust Assurance Skeleton */}
                <div className="flex items-center gap-3 py-2">
                  <div className="h-5 w-5 bg-base-300 rounded-full shrink-0" />
                  <div className="h-3 w-full bg-base-300 rounded-md" />
                </div>

                {/* Button Skeleton */}
                <div className="h-14 w-full bg-base-300 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
