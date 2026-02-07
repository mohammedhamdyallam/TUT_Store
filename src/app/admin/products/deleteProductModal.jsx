export default function DeleteProductModal({
  isDeleteProductModalOpen,
  setIsDeleteProductModalOpen,
  productTitle,
  productId,
}) {
  // Delete Product
  async function deleteProduct() {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setIsDeleteProductModalOpen(false);

      console.log("Deleted product:", data.product);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <>
      {isDeleteProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              حذف المنتج
            </h2>

            <p className="mb-6 text-gray-600">
              هل أنت متأكد من أنك تريد حذف
              {productTitle ? (
                <span className="font-medium text-gray-900">
                  &quot;{productTitle}&quot;
                </span>
              ) : (
                " هذا المنتج"
              )}
              ؟
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteProductModalOpen(!isDeleteProductModalOpen)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
              >
                إلغاء
              </button>

              <button
                onClick={deleteProduct}
                className="rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
