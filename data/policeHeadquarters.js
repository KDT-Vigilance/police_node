import mongoose from "../database.js";

const PoliceHeadquartersSchema = new mongoose.Schema(
  {
    station_key: { type: String, unique: true, required: true },
    general_key: { type: String, unique: true, required: true },
  },
  {
    versionKey: false, // `_v` 필드 비활성화
    timestamps: true, // `createdAt`, `updatedAt` 자동 추가
  }
);

const PoliceHeadquarters = mongoose.model(
  "PoliceHeadquarters",
  PoliceHeadquartersSchema
);

// CRUD 기능
export const createPoliceHQ = async (data) =>
  await PoliceHeadquarters.create(data);
export const getPoliceHQs = async () => await PoliceHeadquarters.find();
export const getPoliceHQById = async (id) =>
  await PoliceHeadquarters.findById(id);
export const updatePoliceHQ = async (id, data) =>
  await PoliceHeadquarters.findByIdAndUpdate(id, data, { new: true });
export const deletePoliceHQ = async (id) =>
  await PoliceHeadquarters.findByIdAndDelete(id);

// 🔹 특정 station_key & general_key 값이 존재하는지 찾는 메소드 추가
export const findByKeys = async (station_key, general_key) => {
  // 필수 인자 확인
  if (!station_key || !general_key) {
    throw new Error("station_key와 general_key는 필수입니다.");
  }

  const result = await PoliceHeadquarters.findOne({
    station_key,
    general_key,
  });

  // 결과가 없을 경우
  if (!result) {
    throw new Error("station_key와 general_key를 확인해주세요.");
  }
};

export default PoliceHeadquarters;
