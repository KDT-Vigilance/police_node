import express from "express";
import cors from "cors"; // CORS 추가
import { createServer } from "http"; // HTTP 서버 생성
import { Server } from "socket.io"; // socket.io 추가
import { config } from "./config.js";
import userRouter from "./router/userRouter.js";
import reportRouter from "./router/reportRouter.js";
import stationRouter from "./router/stationRouter.js";
import policeHQRouter from "./router/policeHeadquarters.js";

const app = express();
const server = createServer(app); // HTTP 서버 생성
const io = new Server(server, {
  cors: {
    origin: "*", // 모든 도메인 허용 (보안이 필요하면 특정 도메인만 허용)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// 🔹 CORS 설정 추가
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const connectedClients = {}; // tel을 key로, socket ID를 value로 저장

// 🔹 소켓 서버 설정
io.on("connection", (socket) => {
  console.log("🟢 새로운 클라이언트 연결됨:", socket.id);

  // 클라이언트에서 tel 정보 전달 시 처리
  const { tel } = socket.handshake.query;
  if (tel) {
    connectedClients[tel] = socket.id; // tel을 key로 socket.id 저장
    console.log(`📞 ${tel}님이 소켓 연결됨 (ID: ${socket.id})`);
  }

  // 특정 tel을 가진 사용자에게 메시지 전송
  if (tel) {
    socket.emit("message", `📢 ${tel}님의 연결이 확인되었습니다.`);
  }

  // 클라이언트로부터 메시지 받기
  socket.on("client_message", (msg) => {
    console.log(`📩 클라이언트(${socket.id}) 메시지:`, msg);
    socket.emit("server_message", `📢 서버에서 응답: ${msg}`);
  });

  // 클라이언트 연결 해제 처리
  socket.on("disconnect", () => {
    console.log("🔴 클라이언트 연결 종료:", socket.id);

    // connectedClients에서 해당 tel 제거
    if (tel && connectedClients[tel] === socket.id) {
      delete connectedClients[tel];
      console.log(`🗑️ ${tel}님의 소켓 정보 삭제됨`);
    }
  });
});

// 라우터 등록 (io와 connectedClients를 넘겨줄 수 있도록 설정)
app.use("/user", userRouter);
app.use("/report", reportRouter(io, connectedClients));
app.use("/station", stationRouter(io, connectedClients)); // io, connectedClients 전달
app.use("/policehq", policeHQRouter);

// 서버 실행
const PORT = config.hosting_port.police_back;
server.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT} (with WebSocket)`)
);

// io와 connectedClients를 export
export { io, connectedClients };
