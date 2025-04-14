import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/app/lib/mongodb";
import { useReducer } from "react";

export async function POST(req: Request){
    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("ProjectAlimentation");
    const users = db.collection("users");

    const userExists = await users.findOne({ email });

    if (userExists) {
        return NextResponse.json({ error: "Usuário já existe "}, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
        email,
        password: hashedPassword,
        createdAt: new Date(),
    });

    return NextResponse.json({ message: "Usuário registrado com sucesso!", userId: result.insertedId });
    
}