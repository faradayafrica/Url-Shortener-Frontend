import React from 'react'
import {IoBulbOutline, IoBulb} from 'react-icons/io5'

const Bulb = ({onMode, dark}) => {
  return (
    <div>
      <button
        className="bg-[#E3E7F4] p-2 m-4 border-8 border-[#606773] rounded-[20px]"
        onClick={onMode}
      >
        {dark ? <IoBulb size={24}/> : <IoBulbOutline size={24} />}
      </button>
    </div>
  );
}

export default Bulb

