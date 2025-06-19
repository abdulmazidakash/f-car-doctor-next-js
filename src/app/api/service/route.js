import dbConnect, { servicesObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async(req)=>{
	const body = await req.json();
	// console.log('route body--->', body);
	const bookingsCollection = dbConnect(servicesObj.bookingsCollection);
	const result = await bookingsCollection.insertOne(body);

	return NextResponse.json(result);
}