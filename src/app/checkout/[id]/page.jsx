import CheckoutForm from '@/components/forms/CheckoutForm'
import React from 'react'

export default async function CheckOutPage({params}) {
	const p = await params;
	const res = await fetch(`${process.env.NEXTAUTH_URL}/api/service/${p.id}`);
	const data = await res.json();
	console.log('checkout page data---->', data);

  return (
	<div>
		<CheckoutForm data={data}/>
	</div>
  )
}
