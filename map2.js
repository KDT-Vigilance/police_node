import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const JUSO_API_KEY = "devU01TX0FVVEgyMDI1MDMyMDE2MjMzMDExNTU2NTM="; // 🔹 발급받은 API 키 입력

const getRoadAddressFromZipcode = async (zipcode) => {
  const url = `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${JUSO_API_KEY}&currentPage=1&countPerPage=1&keyword=${zipcode}&resultType=json`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data || !data.results.juso || data.results.juso.length === 0) {
    console.error("❌ 해당 우편번호에 대한 도로명 주소를 찾을 수 없습니다.");
    return null;
  }

  return data.results.juso[0].roadAddr; // 🔹 변환된 도로명 주소 반환
};

// 🔹 실행 (테스트할 우편번호 입력)
const testZipcode = "06236";
getRoadAddressFromZipcode(testZipcode).then((address) => {
  if (address) {
    console.log(`✅ 도로명 주소: ${address}`);
  }
});
