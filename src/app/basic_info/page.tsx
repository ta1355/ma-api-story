"use client";

import { CharacterBasicInfoDto } from "@/lib/nexon/dto/characterBasicInfo.dto";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NexonBasicInfo() {
  const [data, setData] = useState<CharacterBasicInfoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 쿼리 파라미터 읽기
  const searchParams = useSearchParams();
  const ocidValue = searchParams.get("ocid");

  useEffect(() => {
    if (!ocidValue) return;

    const fetchCharacterData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/nexon_basic_info`, {
          params: { ocid: ocidValue },
        });
        setData(response.data as CharacterBasicInfoDto);
      } catch (error) {
        setError("캐릭터 정보를 가져오는 데 실패했습니다.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterData();
  }, [ocidValue]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">캐릭터 정보</h1>
        {data ? (
          <div className="space-y-4">
            <Image
              src={data.character_image}
              alt={data.character_name}
              width={128}
              height={128}
              className="rounded-full mx-auto"
            />
            <p>
              <strong>캐릭터 이름:</strong> {data.character_name}
            </p>
            <p>
              <strong>월드 이름:</strong> {data.world_name}
            </p>
            <p>
              <strong>성별:</strong> {data.character_gender}
            </p>
            <p>
              <strong>직업:</strong> {data.character_class}
            </p>
            <p>
              <strong>레벨:</strong> {data.character_level}
            </p>
            <p>
              <strong>길드 이름:</strong> {data.character_guild_name}
            </p>
            <p>
              <strong>등록일:</strong>{" "}
              {new Date(data.character_date_create).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
