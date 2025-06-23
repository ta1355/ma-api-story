import axios from "axios";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const characterName = url.searchParams.get("character_name");

  if (!characterName) {
    return new Response(JSON.stringify({ error: "캐릭터 이름 확인 바람" }));
  }

  try {
    // Nexon API 호출
    const response = await axios.get(
      `https://open.api.nexon.com/maplestory/v1/id?character_name=${encodeURIComponent(
        characterName
      )}`,
      {
        headers: {
          accept: "application/json",
          "x-nxopen-api-key": process.env.NEXON_API_KEY, // API 키는 .env에서 불러옴
        },
      }
    );

    // 성공적으로 데이터 받아오면 응답 반환
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: "API 요청 실패" }));
  }
}

// 연습용 api 엔드포인트
// http://localhost:3000/api/nexon_api?character_name=
