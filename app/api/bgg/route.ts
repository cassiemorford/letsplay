import { BggSearchDto } from "boardgamegeekclient/dist/esm/dto";
import { NextRequest, NextResponse } from "next/server";
import { BggClient } from "boardgamegeekclient";
import { bggSearchSchema } from "@/validationSchemas/bggSearch";
const client = BggClient.Create();

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = bggSearchSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format, { status: 400 });
  }

  const result: BggSearchDto[] = await client.search.query({
    query: body.queryString,
  });

  return NextResponse.json(result, { status: 200 });
}
