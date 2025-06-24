import { getCharacterBasicInfo } from "@/lib/nexon/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const ocid = url.searchParams.get("ocid");

  if (!ocid) {
    return NextResponse.json(
      { error: "ocid 파라미터가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const data = await getCharacterBasicInfo(ocid);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("기본 정보 요청 실패:", error);
    return NextResponse.json({ error: "기본 정보 요청 실패" }, { status: 500 });
  }
}

// 예시 http://localhost:3000/api/nexon_basic_info?ocid=4b94e272fd4219c632dffd641f97a341
