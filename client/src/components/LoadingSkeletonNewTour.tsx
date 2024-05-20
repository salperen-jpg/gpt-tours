import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeletonNewTour = () => {
  return (
    <section className="grid gap-8 lg:grid-cols-2">
      <Skeleton className="rounded-lg bg-opacity-85" />
      <div>
        <Skeleton className="text-primary mb-4 font-semibold"></Skeleton>
        <Skeleton className="leading-7 mb-4"></Skeleton>
        <div>
          <Skeleton className="block text-primary mb-4"></Skeleton>
          <ul>
            {Array(3)
              .fill(1)
              .map((_, index) => {
                return (
                  <Skeleton
                    key={index}
                    className="flex items-center gap-x-4 mb-4"
                  >
                    <Skeleton className=" h-16 w-16" />
                    <Skeleton></Skeleton>
                  </Skeleton>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default LoadingSkeletonNewTour;
