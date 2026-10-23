import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base-100/80 backdrop-blur-md min-h-screen">
      <div className="flex flex-col items-center space-y-6 animate-pulse">
        {/* Brand Logo or Icon Spinner */}
        <div className="relative flex items-center justify-center">
          {/* Outer Ring Animation */}
          <div className="absolute w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />

          {/* Inner Branding / Heart Icon / Care.xyz initial */}
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shadow-inner overflow-hidden p-2">
            <Image
              src="/carexyzlogo.png"
              alt="Care.xyz Logo"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-extrabold text-base-content tracking-wide">
            Care<span className="text-primary">.xyz</span>
          </h2>
          <p className="text-xs text-base-content/60 font-medium">
            আপনার নির্ভরযোগ্য কেয়ার প্ল্যাটফর্ম লোড হচ্ছে...
          </p>
        </div>

        {/* Loading Dots Bar */}
        <div className="flex gap-1.5 pt-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </div>
  );
}
