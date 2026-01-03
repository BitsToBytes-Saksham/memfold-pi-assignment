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
      stream: true, // Enable streaming
    };

    const upstream = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      const errorData = await upstream.json();
      return NextResponse.json(
        { error: "Upstream error", details: errorData },
        { status: upstream.status }
      );
    }

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              controller.close();
              break;
            }

            // Decode and forward the chunk
            const chunk = decoder.decode(value, { stream: true });
            controller.enqueue(new TextEncoder().encode(chunk));
          }
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Request failed", details: String(err) },
      { status: 500 }
    );
  }
}
