export default function ToolSkeleton() {
  return (
    <>
      <div className="animate-pulse">
        <div className="grid grid-cols-[400px_1fr_1fr_1fr_1fr] border-b border-gray-200 px-2 py-5 text-sm dark:border-gray-800 dark:bg-black dark:text-gray-400">
          {Array.from(Array(5)).map((_, i) => (
            <div key={i} className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
          ))}
        </div>

        {Array.from(Array(10)).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[400px_1fr_1fr_1fr_1fr] border-b border-gray-200 px-2 py-5 text-sm dark:border-gray-800 dark:text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
        ))}
      </div>
    </>
  );
}
