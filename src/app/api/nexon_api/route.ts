import { getOcidByCharacterName } from "@/lib/nexon/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const characterName = url.searchParams.get("character_name");

  if (!characterName) {
    return NextResponse.json(
      { error: "캐릭터 이름 확인 바람" },
      { status: 400 }
    );
  }

  try {
    const data = await getOcidByCharacterName(characterName);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("OCID 요청실패", error);
    return NextResponse.json({ error: "API 요청실패" }, { status: 500 });
  }
}

// 예시: http://localhost:3000/api/nexon_api?character_name=토끼앗호우
