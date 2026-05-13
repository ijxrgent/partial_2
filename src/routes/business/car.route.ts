// src/routes/car.routes.ts

import { Router } from "express";
import { CarController } from "../../controllers/business/car.controller";

const router = Router();

const carController = new CarController();

// GET
router.get("/", carController.getAllCars);
router.get("/:id", carController.getCarById);

// POST
router.post("/", carController.createCar);

// PUT
router.put("/:id", carController.updateCar);

// DELETE
router.delete("/:id", carController.deleteCar);

export default router;