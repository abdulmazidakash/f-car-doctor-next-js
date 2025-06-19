
import MyAllBookingsTable from '@/components/tables/MyAllBookingsTable';
import { headers } from 'next/headers';

const fetchBookingData = async()=>{
	const res = await fetch(`${process.env.NEXTAUTH_URL}/api/service`, {
		headers: await headers(),
	});
	const d = await res.json();
	return d;
}
export default async  function MyBookingsPage() {
	const data = await fetchBookingData();

	console.log('my bookings page data--->', data);
  return (
	<div>
		<MyAllBookingsTable data={data}/>
	</div>
  )
}
