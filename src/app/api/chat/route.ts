import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json();

    // Basic validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || !lastMessage.content || lastMessage.content.trim().length === 0) {
      return NextResponse.json({ error: "Message content cannot be empty" }, { status: 400 });
    }

    // Limit message length to prevent abuse
    if (lastMessage.content.length > 500) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        error: "No API key provided",
        fallback: true
      }, { status: 200 });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant for NatureStay Homestay.
            The homestay is located in North Bengal hills.
            Provide information about stays, local food, and activities.
            Answer in ${language}. Keep responses concise and friendly.`
          },
          ...messages.map((m: any) => ({
            role: m.role,
            content: m.content
          }))
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json({ content: data.choices[0].message.content });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
