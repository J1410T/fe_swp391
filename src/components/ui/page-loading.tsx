// src/components/ui/page-loading.tsx
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type PageLoadingProps = {
  className?: string;
  variant?: "spinner" | "skeleton";
};

export const PageLoading = ({ 
  className,
  variant = "spinner" 
}: PageLoadingProps) => {
  if (variant === "skeleton") {
    return (
      <div className={cn("space-y-4 p-6", className)}>
        <Skeleton className="h-12 w-3/4" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-[60vh]",
      className
    )}>
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <div className="text-lg font-medium">Đang tải...</div>
      </div>
    </div>
  );
};