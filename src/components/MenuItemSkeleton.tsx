import { Skeleton } from "@/components/ui/skeleton";

export const MenuItemSkeleton = () => {
  return (
    <div className="card-hotel rounded-2xl overflow-hidden animate-pulse">
      <div className="relative h-56">
        <Skeleton className="w-full h-full" />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
        
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        
        <div className="h-px bg-border" />
        
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};