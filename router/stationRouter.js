import express from "express";
import {
  getStations,
  createStation,
  getStationById,
  updateStation,
  deleteStation,
} from "../data/station.js";

const router = express.Router();

router.get("/", async (req, res) => res.json(await getStations()));
router.post("/", async (req, res) => res.json(await createStation(req.body)));
router.get("/:id", async (req, res) =>
  res.json(await getStationById(req.params.id))
);
router.put("/:id", async (req, res) =>
  res.json(await updateStation(req.params.id, req.body))
);
router.delete("/:id", async (req, res) =>
  res.json(await deleteStation(req.params.id))
);

export default router;
