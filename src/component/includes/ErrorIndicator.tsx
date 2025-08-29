import React from "react";

interface ErrorProps {
  error: string | boolean;
}

const ErrorIndicator: React.FC<ErrorProps> = ({ error }) => {
  return <span className="errorIndicator">{error}</span>;
};

export default React.memo(ErrorIndicator);
