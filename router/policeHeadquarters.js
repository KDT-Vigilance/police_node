import express from "express";
import {
  getPoliceHQs,
  createPoliceHQ,
  getPoliceHQById,
  updatePoliceHQ,
  deletePoliceHQ,
} from "../data/policeHeadquarters.js";

const router = express.Router();

router.get("/", async (req, res) => res.json(await getPoliceHQs()));
router.post("/", async (req, res) => res.json(await createPoliceHQ(req.body)));
router.get("/:id", async (req, res) =>
  res.json(await getPoliceHQById(req.params.id))
);
router.put("/:id", async (req, res) =>
  res.json(await updatePoliceHQ(req.params.id, req.body))
);
router.delete("/:id", async (req, res) =>
  res.json(await deletePoliceHQ(req.params.id))
);

export default router;
