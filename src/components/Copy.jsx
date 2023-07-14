import React, { useState } from "react";

const Copy = ({url}) => {
    const [isCopied, setIsCopied] = useState(false)
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(url)
    setIsCopied(true)
  };
  return (
    <button className="bg-[#2a2e32] px-5 py-2 mt-3 text-center m-auto text-white"
    onClick={handleCopy}
    
    >
      {isCopied ? "Copied" : "Copy"}
    </button>
  );
};

export default Copy;
