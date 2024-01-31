import React, { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      {children}
    </div>
  )
}

export default Card
