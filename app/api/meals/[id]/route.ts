import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Função para excluir uma refeição com base no ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Aqui pegamos o 'id' da URL

    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ error: "ID inválido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = await clientPromise;
    const db = client.db("ProjectAlimentation");

    // Deleta a refeição com o ObjectId correspondente
    const result = await db.collection("meals").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Refeição não encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.json({ message: "Refeição excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir refeição:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao excluir refeição" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Função para editar uma refeição com base no ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ error: "ID inválido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();

    // Remover o campo '_id' do corpo da requisição
    const { _id, ...updatedData } = body;

    // Verifica e converte campos necessários
    const calories = Number(updatedData.calories);  // Converte para número
    const dateTime = new Date(updatedData.dateTime); // Converte para Date

    if (isNaN(calories)) {
      return new Response(
        JSON.stringify({ error: "Calorias inválidas" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verificar se a data é válida
    if (isNaN(dateTime.getTime())) {
      return new Response(
        JSON.stringify({ error: "Data inválida" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = await clientPromise;
    const db = client.db("ProjectAlimentation");

    // Realiza a atualização sem o campo _id
    const result = await db.collection("meals").updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updatedData, calories, dateTime } }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Refeição não encontrada ou nenhum dado foi alterado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.json({ message: "Refeição atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao editar refeição:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao editar refeição"}),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}