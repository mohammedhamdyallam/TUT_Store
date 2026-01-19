export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-[#F5F9FA] px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-[#6BB7C7]/30 border-t-[#6BB7C7] animate-spin"></div>
        <div className="text-gray-600 text-sm font-medium">
          Loading...
        </div>
      </div>
    </div>
  );
}
