import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js API Route Proxy -> Dedicated Express Backend
 * Forwards enquiry requests directly to the Node.js + Express backend service
 * ensuring zero duplicated logic or competing implementations.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl =
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";

    const backendRes = await fetch(`${backendUrl.replace(/\/$/, "")}/api/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For":
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          "",
        "User-Agent": request.headers.get("user-agent") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err: unknown) {
    console.error(
      "[Next.js API Gateway] Error relaying request to Express backend:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(
      {
        success: false,
        ok: false,
        message:
          "Unable to connect to the Parth Packaging backend service. Please ensure the Express server is running on port 5000.",
      },
      { status: 502 }
    );
  }
}
