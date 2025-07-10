import React from 'react'
import Image from "next/image";
import Link from "next/link";




const TrendingCard = (props) => {
  return (
    <div className="bg-gray-600 shadow-md hover:shadow-sky-800 hover:scale-100 transition duration-400 ease-in-out p-6 m-4 rounded-lg flex flex-col items-center text-center max-w-sm mx-auto">
      <Image src={props.image} width={100} height={120} alt={props.names} className="mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-3" />
      <h3 className="text-xl font-bold text-gray-200 mb-2">{props.names}</h3>
      <p className="text-gray-200 font-bold">{props.price}</p>
     
      <Link href={`/details/${props.id}`}>
        <button className="bg-gray-700 text-white mt-2 px-4 py-2 rounded hover:bg-gray-900">
          View Details
        </button>
      </Link>
    </div>
  );
}

export default TrendingCard;
