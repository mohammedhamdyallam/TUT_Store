export default function LoadingActions() {
  return (
    <div className="min-h-full flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-[#6BB7C7]/30 border-t-[#6BB7C7] animate-spin"></div>
        <div className="text-gray-600 text-sm font-medium">جاري التحميل...</div>
      </div>
    </div>
  );
}
