import { Token } from "@/pages/Profile";
import { useLoaderData } from "react-router-dom";

const TokenAmount = () => {
  const data = useLoaderData() as Token;
  return (
    <div className="inline-block p-4 rounded-lg bg-primary mb-4">
      <span>
        Token : <strong>{data?.tokenAmount || "unknown"}</strong>
      </span>
    </div>
  );
};
export default TokenAmount;
