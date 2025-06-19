import { authOptions } from "@/lib/authOptions";
import dbConnect, { servicesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async(req, {params}) =>{
	const p = await params;
	const bookingCollection = dbConnect(servicesObj.bookingsCollection);
	const query = { _id: new ObjectId(p.id)};

	const session = await getServerSession(authOptions);
	const email = session?.user?.email;
	const singleBooking = await bookingCollection.findOne(query);
	const isOwnerOK = email === singleBooking?.email;

	if(isOwnerOK){
		return NextResponse.json(singleBooking)
	}else{
		return NextResponse.json({message: 'forbidden get access'}, {status: 401})
	}
	

}

export const PATCH = async(req, {params})=>{
	const p = await params;
	const bookingsCollection = dbConnect(servicesObj.bookingsCollection);
	const query = { _id: new ObjectId(p.id)};

	const session = await getServerSession(authOptions);
	const email = session?.user?.email;
	const currentBooking = await bookingsCollection.findOne(query);
	const isOwnerOK = email === currentBooking?.email;

	if(isOwnerOK){
		const body = await req.json();
		const filter = {
			$set: {...body},
		}
		const option = {
			upsert: true
		}
		const updateResponse = await bookingsCollection.updateOne(query, filter, option);
		revalidatePath('/my-bookings')
		return NextResponse.json(updateResponse);
	}else{
		return NextResponse.json({message: 'forbidden access'}, {status: 401})
	}
}