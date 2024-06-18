import { BggThingDto } from "boardgamegeekclient/dist/esm/dto";
import { NextRequest, NextResponse } from "next/server";
import { BggClient } from "boardgamegeekclient";
import { bggGameInfoSchema } from "@/validationSchemas/bgg";
const client = BggClient.Create();

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = bggGameInfoSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const things: BggThingDto[] = await client.thing.query({
    id: [+body.bggId],
    type: "boardgame",
  });
  const gameData = things[0];

  return NextResponse.json(gameData, { status: 200 });
}
