import { NextResponse } from "next/server";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export async function GET(
  request: Request,
  { params }: { params: { pathname: string[] } }
) {
  // Get the pathname segments and join them to form the backend route
  const pathname = (await params).pathname.join("/");
  const res = await fetchWithAuth(`/api/${pathname}`);
  const data = await res.json();
  return NextResponse.json(data);
}
