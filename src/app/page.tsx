"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation"; // useRouter 다시 사용

export default function Home() {
  const [characterName, setCharacterName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // useRouter 사용

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/nexon_api`, {
        params: {
          character_name: characterName,
        },
      });

      const data = response.data;

      if (data.ocid) {
        router.push(`/basic_info?ocid=${data.ocid}`); // 라우팅 처리
      } else {
        setError("OCID를 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      setError("API 요청 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">캐릭터 조회</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="character_name"
              className="block text-sm font-semibold text-gray-700"
            >
              캐릭터 이름
            </label>
            <input
              type="text"
              id="character_name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="캐릭터 이름을 입력하세요"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            className={`w-full py-2 bg-blue-500 text-white rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "로딩 중..." : "검색"}
          </button>
        </form>
      </div>
    </div>
  );
}
