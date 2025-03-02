import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    // Fetch matching articles (Remove `mode: "insensitive"` for SQLite)
    const results = await prisma.article.findMany({
      where: {
        title: {
          contains: query, // Case-sensitive in SQLite
        },
      },
    });

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Search Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
