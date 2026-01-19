"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold mb-3">Something went wrong</h1>

        <p className="text-gray-500 mb-6">
          We ran into an unexpected issue. Please try again or reload the page.
        </p>

        {/* Development error details */}
        {process.env.NODE_ENV === "development" && (
          <pre className="bg-gray-100 text-red-600 p-3 rounded-lg mb-6 text-left text-sm overflow-auto">
            {error?.message}
          </pre>
        )}

        <div className="flex justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Try again
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  );
}
