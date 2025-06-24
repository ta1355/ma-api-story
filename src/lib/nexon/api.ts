import axios from "axios";
import { CharacterBasicInfoDto } from "./dto/characterBasicInfo.dto";

const nexonApi = axios.create({
  baseURL: "https://open.api.nexon.com/maplestory/v1",
  headers: {
    Accept: "application/json",
    "x-nxopen-api-key": process.env.NEXON_API_KEY, // api 키는 . env에서 불러옴
  },
});

// 캐릭터 조회 -> OCID 조회
export async function getOcidByCharacterName(
  characterName: string
): Promise<{ ocid: string }> {
  const response = await nexonApi.get(
    `/id?character_name=${encodeURIComponent(characterName)}`
  );
  return response.data;
}

// OCID로 캐릭터 기본 정보 조회
export async function getCharacterBasicInfo(
  ocid: string
): Promise<CharacterBasicInfoDto> {
  const response = await nexonApi.get(`/character/basic?ocid=${ocid}`);
  return response.data as CharacterBasicInfoDto;
}
