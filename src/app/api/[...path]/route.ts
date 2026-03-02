import { NextRequest, NextResponse } from "next/server";

const BE_BASE_URL = process.env.BE_BASE_URL || "http://localhost:4000/api";

async function handleProxy(req: NextRequest, path: string) {
  const contentType = req.headers.get("content-type") || "application/json";
  const method = req.method;

  try {
    const requestHeaders = new Headers();

    const accessToken = req.cookies.get("access_token")?.value;
    if (accessToken) {
      requestHeaders.set("Authorization", `Bearer ${accessToken}`);
    }

    req.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "host" && key.toLowerCase() !== "content-length") {
        requestHeaders.set(key, value);
      }
    });

    const apiPath = path.startsWith("/") ? path : `/${path}`;
    const apiUrl = `${BE_BASE_URL}${apiPath}`;

    let body: BodyInit | undefined;
    if (method !== "GET" && method !== "HEAD") {
      if (contentType.includes("multipart/form-data")) {
        const clonedReq = req.clone();
        body = await clonedReq.arrayBuffer();
      } else {
        body = JSON.stringify(await req.json());
      }
    }

    const response = await fetch(apiUrl, {
      method,
      headers: requestHeaders,
      body,
    });

    const resHeaders = new Headers(response.headers);
    resHeaders.set("Access-Control-Allow-Origin", "*");
    resHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    resHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    const resContentType = response.headers.get("content-type") || "application/json";
    let data: unknown;
    
    if (resContentType.includes("application/json")) {
      data = await response.json();
    } else if (resContentType.includes("multipart/form-data")) {
      data = await response.formData();
    } else {
      data = await response.text();
    }

    const nextResponse = NextResponse.json(data, {
      status: response.status
    });
    // Whitelist set-cookie header for authentication
    // Acceptable cookie key:
    // - accessToken
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookies = setCookieHeader.split(",").map(cookie => cookie.trim());
      const filteredCookies = cookies.filter(cookie => cookie.startsWith("access_token="));
      if (filteredCookies.length > 0) {
        nextResponse.headers.set("set-cookie", filteredCookies.join(","));
      }
    }

    return nextResponse;
  } catch (e) {
    return NextResponse.json(
      { code: 'SERVER_ERROR', message: e instanceof Error ? e.message : 'An error occurred while processing the request.' },
      { status: 500 }
    )
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = await params;
  const apiPath = path.join("/");
  const url = new URL(req.url);
  const queryString = url.search;
  return handleProxy(req, `${apiPath}${queryString}`);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = await params;
  const apiPath = path.join("/");
  console.warn("Proxying POST request to:", apiPath);
  return handleProxy(req, apiPath);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = await params;
  const apiPath = path.join("/");
  return handleProxy(req, apiPath);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = await params;
  const apiPath = path.join("/");
  return handleProxy(req, apiPath);
}