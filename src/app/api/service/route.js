import { authOptions } from "@/lib/authOptions";
import dbConnect, { servicesObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const GET = async(req) =>{
	const session = await getServerSession(authOptions);

	if(session){
		console.log(session);
		const email = session?.user?.email ;
		const bookingCollection = dbConnect(servicesObj.bookingsCollection);
		const result = await bookingCollection.find({ email }).toArray();

		return NextResponse.json(result);
	}
	return NextResponse.json({});
}


export const POST = async(req)=>{
	const body = await req.json();
	// console.log('route body--->', body);
	const bookingsCollection = dbConnect(servicesObj.bookingsCollection);
	const result = await bookingsCollection.insertOne(body);

	return NextResponse.json(result);
}