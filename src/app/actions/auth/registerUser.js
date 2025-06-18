'use server';
import bcrypt from 'bcrypt';
import dbConnect, { servicesObj } from "@/lib/dbConnect";

export const registerUser = async(payload)=>{
	const userCollection = dbConnect(servicesObj.usersCollection);
	// validation 
	const { email, password } = payload;
	if(!email || !password){
		return { success: false, message: "Email and password are required." };
	}

	const user = await userCollection.findOne({ email: payload.email});

	if(!user){
		const hashPassword = await bcrypt.hash(password, 10);
		payload.password = hashPassword; // Store hashed password
		const result = await userCollection.insertOne(payload);
		const { acknowledged, insertedId } = result;
		return { acknowledged, insertedId, success: true, message: "User registered successfully."};
	}
	return { success: false, message: "User already exists." };
}