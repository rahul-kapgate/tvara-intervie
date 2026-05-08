import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = body?.prompt;

    if (!prompt || prompt.trim() === "") {
      return NextResponse.json(
        {
          error: "Prompt is required",
        },
        {
          status: 400,
        }
      );
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await geminiResponse.json();

    console.log(data);

    if (!geminiResponse.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Gemini API Error",
        },
        {
          status: geminiResponse.status,
        }
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]
        ?.text || "No response generated.";

    return NextResponse.json({
      text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}