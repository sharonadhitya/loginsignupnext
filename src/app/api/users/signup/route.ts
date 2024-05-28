import connect from '@/dbconfig/dbconfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        await connect();

        const reqBody = await request.json();
        const { email, password, username } = reqBody;
        console.log(email, password, username);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Corrected typo here
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User created",
            success: true,
        }, { status: 201 });
    } catch (error) {
        console.error("Signup Failed:", error);
        return NextResponse.json({
            error: "Signup failed",
        }, { status: 500 });
    }
}
