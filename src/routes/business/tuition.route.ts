// src/routes/tuition.routes.ts

import { Router } from "express";
import { TuitionController } from "../../controllers/business/tuition.controller.js";

const router = Router();

const tuitionController = new TuitionController();

// GET
router.get("/", tuitionController.getAllTuitions);
router.get("/:id", tuitionController.getTuitionById);

// POST
router.post("/", tuitionController.createTuition);

// PUT
router.put("/:id", tuitionController.updateTuition);

// DELETE
router.delete("/:id", tuitionController.deleteTuition);

export default router;