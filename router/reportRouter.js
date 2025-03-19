import express from "express";

const reportRouter = (io, connectedClients) => {
  const router = express.Router();

  // 🔹 특정 tel을 가진 클라이언트에게 메시지 전송 API
  router.post("/send-message", (req, res) => {
    const { tel, message } = req.body;

    if (!tel || !message) {
      return res
        .status(400)
        .json({ status: false, message: "tel과 message가 필요합니다." });
    }

    const targetSocketId = connectedClients[tel]; // 해당 tel에 해당하는 소켓 ID 가져오기
    if (targetSocketId) {
      io.to(targetSocketId).emit("private_message", message); // 특정 클라이언트에게 메시지 전송
      console.log(`📩 ${tel}에게 메시지 전송됨: ${message}`);
      return res.json({ status: true, message: "메시지 전송 성공" });
    } else {
      console.log(`❌ ${tel}님은 현재 연결되어 있지 않습니다.`);
      return res
        .status(404)
        .json({
          status: false,
          message: "해당 전화번호의 클라이언트가 연결되어 있지 않습니다.",
        });
    }
  });

  return router;
};

export default reportRouter;
