export default function CardSkeleton() {
  return (
    <>
      <div className="relative mt-8 flex h-48 min-w-[240px] animate-pulse flex-col justify-between rounded-xl bg-white p-4 shadow-md inset-shadow-2xs dark:border dark:border-gray-800 dark:bg-black">
        <div className="flex items-start justify-between">
          <div className="h-5 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-300 shadow-lg dark:bg-gray-700"></div>
        </div>
        <div className="mt-4 flex items-baseline space-x-2">
          <div className="h-10 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div>
          <div className="h-6 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
    </>
  );
}
