import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req: Request){
    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("ProjectAlimentation");
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
        return NextResponse.json({error: "Usuário não encontrado"}, { status:401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return NextResponse.json({ error: "Senha incorreta"}, { status: 401});
    }

    return NextResponse.json({ message: "Login realizado com sucesso", userId: user._id });
}