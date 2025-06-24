import { getCharacterBasicInfo } from "@/lib/nexon/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const ocid = url.searchParams.get("ocid");

  if (!ocid) {
    return new Response(
      JSON.stringify({ error: "ocid 파라미터가 필요합니다." }),
      { status: 400 }
    );
  }

  try {
    const data = await getCharacterBasicInfo(ocid);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("기본 정보 요청 실패:", error);
    return new Response(JSON.stringify({ error: "기본 정보 요청 실패" }), {
      status: 500,
    });
  }
}
