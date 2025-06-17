"use client"
// import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default  function ServicesSection() {

	const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('/services.json');
      const data = await response.json();
      setServices(data);
      console.log(data); // Check in browser console
    };

    fetchServices();
  }, []);

	// const servicesCollection = dbConnect(collectionNameObj.servicesCollection);
	// const data = await servicesCollection.find({}).toArray();
	// const data = await res.json();

	// console.log(data);

  return (
	<div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
		{services.map((item) =>{
			return (
				<div 
				className='' 
				key={item.service_id}>
					<figure>
					<Image  alt={item.title} src={item.img} width={314} height={208}/>
					</figure>
					<div className=''>
						<div>
							<h2>{item.title}</h2>
						
						</div>
						<div className='flex gap-4 items-center'>
						<p>Price: ${item.price}</p>
							<Link href={`/services/${item._id}`} className='text-orange-500'> <FaArrowUpRightFromSquare/> </Link>
						</div>
					</div>
				</div>
			)
		})}
	</div>
  )
}