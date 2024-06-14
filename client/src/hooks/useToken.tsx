import type { Token } from "@/pages/Profile";
import { customFetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const useTokenAmount = () => {
  const { isPending, data, isError } = useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      const { data } = await customFetch<Token>("/token");
      return data.tokenAmount;
    },
  });
  return { isPending, data, isError };
};

export default useTokenAmount;
