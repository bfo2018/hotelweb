import { NextRequest, NextResponse } from "next/server";
import { CONCIERGE_SYSTEM_PROMPT } from "@/lib/concierge-prompt";

/**
 * POST /api/concierge
 * AI Concierge chat endpoint — calls Anthropic Claude API.
 * Requires ANTHROPIC_API_KEY environment variable.
 */
export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      // Fallback response when API key is not configured
      return NextResponse.json({
        role: "assistant",
        content:
          "I'd love to help! Our concierge service is being set up. In the meantime, please call us at +1 (234) 567-890 or email hello@lumiereandstone.com for assistance.",
      });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        system: CONCIERGE_SYSTEM_PROMPT,
        messages: messages.map(
          (msg: { role: string; content: string }) => ({
            role: msg.role,
            content: msg.content,
          })
        ),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Anthropic API error:", error);
      return NextResponse.json(
        { error: "Failed to get response from concierge" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      role: "assistant",
      content: data.content[0].text,
    });
  } catch (error) {
    console.error("Concierge API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
