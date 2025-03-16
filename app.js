import express from "express";
import { config } from "./config.js";
import userRouter from "./router/userRouter.js";
import reportRouter from "./router/reportRouter.js";
import stationRouter from "./router/stationRouter.js";
import policeHQRouter from "./router/policeHeadquarters.js";

const app = express();
app.use(express.json());

// 라우터 등록
app.use("/users", userRouter);
app.use("/reports", reportRouter);
app.use("/stations", stationRouter);
app.use("/policehq", policeHQRouter);

// 서버 실행
const PORT = config.hosting_port.police_back;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
