import { authOptions } from "@/lib/authOptions";
import dbConnect, { servicesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export const DELETE = async(req,{params})=>{
	const p = await params;
	const bookingCollection = dbConnect(servicesObj.bookingsCollection);
	const query = { _id: new ObjectId(p.id)};

	//validation
	const session = await getServerSession(authOptions);
	const currentBooking = await bookingCollection.findOne(query);

	const isOwnerOK = session?.user?.email === currentBooking.email;
	if(isOwnerOK){
		const deleteBooking = await bookingCollection.deleteOne(query);
		revalidatePath('/my-bookings')
		return NextResponse.json(deleteBooking);
	}
	return NextResponse.json({success: false, message: 'forbidden action'}, {status: 401})
}
export const GET = async(req, { params })=>{
	const p = await params;
	const servicesCollection = dbConnect(servicesObj.servicesCollection);
	const data = await servicesCollection.findOne({ _id: new ObjectId(p.id)});

	return NextResponse.json(data);
}