import React from 'react'

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
    console.log(date);
  return (
    <p className='text-white mt-6 mb-10'>
        {`Faraday ${year}. All Rights Reserved`}
    </p>
  )
}

export default Footer