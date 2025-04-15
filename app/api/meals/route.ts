import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("ProjectAlimentation");

    const { userId, ...mealData } = body;

    const result = await db.collection("meals").insertOne({
      ...mealData,
      userId,
    });

    return NextResponse.json({ ...body, _id: result.insertedId });
  } catch (error) {
    console.error("Erro ao salvar refeição:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao salvar" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("ProjectAlimentation");

    // 🆕 Captura userId e type da URL
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const type = searchParams.get("type");

    // 🧠 Monta filtro dinâmico
    const filter: any = {};
    if (userId) filter.userId = userId;
    if (type) filter.type = type;

    const meals = await db
      .collection("meals")
      .find(filter)
      .sort({ dateTime: -1 })
      .toArray();

    return NextResponse.json(meals);
  } catch (error) {
    console.error("Erro ao buscar refeições:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar refeições" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
