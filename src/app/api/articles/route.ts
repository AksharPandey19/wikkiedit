import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Fetch article by ID (GET)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing article ID" }, { status: 400 });
    }

    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ Handle article creation (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const newArticle = await prisma.article.create({
      data: { title, content },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("Create Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


// Handle Article Updates
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing article ID" }, { status: 400 });
    }

    const { title, content } = await req.json();

    const updatedArticle = await prisma.article.update({
      where: { id: Number(id) },
      data: { title, content },
    });

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}