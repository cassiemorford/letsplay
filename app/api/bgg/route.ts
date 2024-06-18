import { BggSearchDto } from "boardgamegeekclient/dist/esm/dto";
import { NextRequest, NextResponse } from "next/server";
import { BggClient } from "boardgamegeekclient";
const client = BggClient.Create();

export async function POST(request: NextRequest) {
  const body = await request.json();

  // const validation = gameInstanceCreationSchema.safeParse(body);

  const result: BggSearchDto[] = await client.search.query({
    query: body.queryString,
  });

  return NextResponse.json(result, { status: 200 });
}
