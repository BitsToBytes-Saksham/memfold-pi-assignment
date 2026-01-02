import { NextResponse } from "next/server";

const BASE_URL = "https://litellm.memfold.ai";

const systemPrompt = {
  role: "system",
  content:
    "You are Pi, a calm, warm, and thoughtful assistant. Be concise, practical, and empathetic. Prefer short paragraphs, ask clarifying questions when helpful, and avoid generic advice.",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history, model } = body || {};

    if (!message && (!history || !Array.isArray(history))) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server missing API key" },
        { status: 500 }
      );
    }

    const messages = [
      systemPrompt,
      ...(Array.isArray(history) ? history : []),
    ];

    if (message) {
      messages.push({ role: "user", content: message });
    }

    const payload = {
      model: model || "gpt-5.1",
      messages,
    };

    const upstream = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream error", details: data },
        { status: upstream.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Request failed", details: String(err) },
      { status: 500 }
    );
  }
}
