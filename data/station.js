import mongoose from "../database.js";
import bcrypt from "bcrypt";

const StationSchema = new mongoose.Schema(
  {
    station_name: { type: String, required: true },
    account: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    tel: { type: String, unique: true, required: true },
    station_key: { type: String, unique: true, required: true },
    general_key: { type: String, unique: true, required: true },
  },
  {
    versionKey: false, // `_v` 필드 비활성화
    timestamps: true, // `createdAt`, `updatedAt` 자동 추가
  }
);

const Station = mongoose.model("Station", StationSchema);

// 회원가입 데이터 중복 체크
export async function duplicationCheck(data) {
  const existingStation = await Station.findOne({ account: data.account });
  if (existingStation) throw new Error("이미 존재하는 계정입니다.");

  const existingTel = await Station.findOne({ tel: data.tel });
  if (existingTel) throw new Error("이미 등록된 전화번호입니다.");

  const existingStationKey = await Station.findOne({
    station_key: data.station_key,
  });
  if (existingStationKey) throw new Error("이미 등록된 경찰서 키입니다.");

  const existingGeneralKey = await Station.findOne({
    general_key: data.general_key,
  });
  if (existingGeneralKey) throw new Error("이미 등록된 총괄 키입니다.");
}

// 🔹 로그인 (비밀번호 비교)
export const login = async (account, password) => {
  const station = await Station.findOne({ account });
  if (!station) throw new Error("계정을 찾을 수 없습니다.");

  // 비밀번호 검증
  const isPasswordValid = await bcrypt.compare(password, station.password);
  if (!isPasswordValid) throw new Error("비밀번호가 일치하지 않습니다.");

  return station;
};

// CRUD 기능
export const create = async (data) => await Station.create(data);
export const getStations = async () => await Station.find();
export const getStationById = async (id) => await Station.findById(id);
export const updateStation = async (id, data) =>
  await Station.findByIdAndUpdate(id, data, { new: true });
export const deleteStation = async (id) => await Station.findByIdAndDelete(id);

export default Station;
