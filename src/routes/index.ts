import { Router } from "express";

import carRoutes from "./business/car.route";
import tuitionRoutes from "./business/tuition.route";

const router = Router();

router.use("/cars", carRoutes);
router.use("/tuitions", tuitionRoutes);

export default router;