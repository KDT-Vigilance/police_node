import express from "express";
import {
  getReports,
  createReport,
  getReportById,
  updateReport,
  deleteReport,
} from "../data/report.js";

const router = express.Router();

router.get("/", async (req, res) => res.json(await getReports()));
router.post("/", async (req, res) => res.json(await createReport(req.body)));
router.get("/:id", async (req, res) =>
  res.json(await getReportById(req.params.id))
);
router.put("/:id", async (req, res) =>
  res.json(await updateReport(req.params.id, req.body))
);
router.delete("/:id", async (req, res) =>
  res.json(await deleteReport(req.params.id))
);

export default router;
