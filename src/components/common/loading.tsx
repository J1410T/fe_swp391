import { Loader2 } from 'lucide-react';

/**
 * Component hiển thị trạng thái loading
 */
export const Loading = () => {
  return (
    <div className="flex items-center justify-center p-8 w-full">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};
