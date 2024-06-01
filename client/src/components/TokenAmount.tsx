const TokenAmount = ({ tokenAmount }: { tokenAmount: number }) => {
  return (
    <div className="inline-block p-4 rounded-lg bg-primary mb-4">
      <span>
        Token : <strong>{tokenAmount}</strong>
      </span>
    </div>
  );
};
export default TokenAmount;
