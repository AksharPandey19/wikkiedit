import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { query } = req.query;

  try {
    const articles = await prisma.article.findMany({
      where: {
        title: {
          contains: query, // Searches for articles containing the query
          mode: "insensitive",
        },
      },
    });

    return res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error); // Log error to console
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
