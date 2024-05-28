import connect from '@/dbconfig/dbconfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
    try {
        await connect();

        const reqBody = await request.json();
        const { email, password, username } = reqBody;
        console.log(email, password, username);

        const Users = await User.findOne({ email });
        if (!Users) {
            return NextResponse.json({ error: "User dosn't exist already exists" }, { status: 400 });
        }

        const validpassword=await bcryptjs.compare(password,Users.password)
        const tokendata={
            id:Users._id,
            username:Users.username,
            email:Users.email,
        }
        const token= await jwt.sign(tokendata,"secret",{expiresIn:"1hr"})

        const response =NextResponse.json({
            message:"login successfull",
            success:true,
        })

        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response
    } catch (error) {
        console.error("Login Failed:", error);
        return NextResponse.json({
            error: "Login failed",
        }, { status: 500 });
    }
}
