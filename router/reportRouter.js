import express from "express";
import Report from "../data/report.js";

const reportRouter = (io, connectedClients) => {
  const router = express.Router();

  // 🔹 특정 report_id에 해당하는 report 객체를 찾아 해당 tel의 클라이언트에게 전송
  router.post("/send_report", async (req, res) => {
    const { reportId } = req.body;

    if (!reportId) {
      return res
        .status(400)
        .json({ status: false, message: "reportId 필요합니다." });
    }

    try {
      const report = await Report.findById(reportId); // MongoDB에서 report 검색

      if (!report) {
        return res.status(404).json({
          status: false,
          message: "해당 report_id의 데이터를 찾을 수 없습니다.",
        });
      }

      const targetSocketId = connectedClients[report.tel]; // report 객체에서 tel 가져오기

      if (targetSocketId) {
        io.to(targetSocketId).emit("private_report", report); // 해당 클라이언트에게 report 데이터 전송
        console.log(`📩 ${report.tel}에게 report 전송됨:`, report);
        return res.json({ status: true, message: "Report 전송 성공", report });
      } else {
        console.log(`❌ ${report.tel}님은 현재 연결되어 있지 않습니다.`);
        return res.status(404).json({
          status: false,
          message: "해당 전화번호의 클라이언트가 연결되어 있지 않습니다.",
        });
      }
    } catch (error) {
      console.error("데이터 검색 오류:", error);
      return res.status(500).json({
        status: false,
        message: "서버 오류가 발생했습니다.",
      });
    }
  });

  // 🔹 특정 tel 값을 받아 해당하는 report 리스트 반환
  router.post("/myReport", async (req, res) => {
    const { tel } = req.body;

    if (!tel) {
      return res
        .status(400)
        .json({ status: false, message: "tel 값이 필요합니다." });
    }

    try {
      const reports = await Report.find({ tel }).sort({ createdAt: -1 }); // 최신순 정렬

      if (!reports.length) {
        return res.json({
          status: false,
          message: "해당 전화번호로 등록된 신고가 없습니다.",
        });
      }

      return res.json({ status: true, reports });
    } catch (error) {
      console.error("📡 myReport 데이터 검색 오류:", error);
      return res.status(500).json({
        status: false,
        message: "서버 오류가 발생했습니다.",
      });
    }
  });

  return router;
};

export default reportRouter;
