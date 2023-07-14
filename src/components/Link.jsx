import React from 'react'

const Link = ({url}) => {
  return (
    <div className="font-bold text-[#463079] text-center mt-2 text-2xl">
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
    </div>
  );
}

export default Link