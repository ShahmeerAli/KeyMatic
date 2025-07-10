import React from 'react'
import Image from "next/image";


const MainCard = (props)=> {
    return (
        <div className="bg-gray-600 border shadow-md p-4 m-4 rounded-lg flex flex-col items-center text-center max-w-sm mx-auto  hover:shadow-sky-800 hover:scale-100 transition duration-500 ease-in-out">
          <Image src={props.image} width={80} height={80} alt={props.names} className="mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-gray-300 mb-2">{props.names}</h3>
          <p className="text-gray-300">{props.desc}</p>
        </div>
      );
}

export default MainCard