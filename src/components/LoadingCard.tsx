import { LoadingSpinner } from "./LoadingSpinner";

interface LoadingCardProps {
  message?: string;
}

export const LoadingCard = ({ message = "Loading delicious items..." }: LoadingCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-professional border border-border/50">
        <LoadingSpinner size="lg" text={message} />
      </div>
    </div>
  );
};