import React from 'react'

const Loader = ({url, loading}) => {
  return (
    <div>
      {!loading ? (
        <div>{url ? "Create another magic link" : "Perform Faraday Magic"}</div>
      ) : (
        <div className="border-[5px] border-white border-t-[#34db5e] h-10 w-10 rounded-[50%] loader mt-2 m-auto"></div>
      )}
    </div>
  );
}

export default Loader