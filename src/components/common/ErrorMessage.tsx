interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="mt-4 flex w-64 items-center rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-300"
    >
      <div className="flex items-center">
        <div>
          <p className="font-medium">Une erreur est survenue</p>
          <p className="mt-2 text-sm opacity-90">{message}</p>
        </div>
      </div>
    </div>
  );
}
