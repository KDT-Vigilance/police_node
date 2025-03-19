import { config } from "../config.js";
import * as stationRepository from "../data/station.js";
import * as PoliceHeadquarters from "../data/policeHeadquarters.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // 비밀번호 해싱 강도

export async function create(req, res, next) {
  const formData = req.body;
  console.log("formData : ", formData);
  try {
    stationRepository.duplicationCheck(formData);
    console.log("중복 체크 통과!");
    PoliceHeadquarters.findByKeys(formData.station_key, formData.general_key);
    console.log("경찰관리체계 DB에 존재하는 유효한 키");
    const hashedPassword = await bcrypt.hash(formData.password, SALT_ROUNDS);
    const data = stationRepository.create({
      ...formData,
      password: hashedPassword,
    });
    return res.json({ status: true, data });
  } catch (error) {
    return res.json({ status: false, message: error });
  }
}

export async function login(req, res, next) {
  const { account, password } = req.body;
  try {
    const station = await stationRepository.login(account, password);
    return res.json({ status: true, data: station });
  } catch (error) {
    return res.json({ status: false, message: error });
  }
}
