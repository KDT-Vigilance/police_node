import express from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../data/user.js";

const router = express.Router();

router.get("/", async (req, res) => res.json(await getUsers()));
router.post("/", async (req, res) => res.json(await createUser(req.body)));
router.get("/:id", async (req, res) =>
  res.json(await getUserById(req.params.id))
);
router.put("/:id", async (req, res) =>
  res.json(await updateUser(req.params.id, req.body))
);
router.delete("/:id", async (req, res) =>
  res.json(await deleteUser(req.params.id))
);

export default router;
