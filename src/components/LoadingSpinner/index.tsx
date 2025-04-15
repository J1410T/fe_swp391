interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

export const LoadingSpinner = ({ fullScreen = false }: LoadingSpinnerProps) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-gray-50/80 z-50'
    : 'flex items-center justify-center p-4';

  return (
    <div className={containerClasses}>
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-blue-200 animate-spin border-t-blue-500" />
        <div className="mt-4 text-center text-sm text-gray-600">Loading...</div>
      </div>
    </div>
  );
}; 