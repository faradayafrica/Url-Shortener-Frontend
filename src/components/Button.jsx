
import React from 'react'
import Loader from './Loader';

const Button = ({err, loading, url}) => {
  return (
    <button className="w-full p-2 bg-[#089944] text-white font-normal mt-5 rounded-md hover:bg-[#0a7c3a]">
     {} {err ? err : <Loader err={err} loading={loading} url={url}/>}
    </button>
  );
}

export default Button