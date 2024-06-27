import {Router} from 'express'
import { chartDataController, createProjectController, getProjectController, projectCountController, updateProjectStatusController } from '../controllers/project.controller';

const router = Router();

router.get("/project-list", getProjectController)
router.post("/create-project", createProjectController)
router.put("/update-status", updateProjectStatusController)
router.get("/dashboard", projectCountController)
router.get("/chart", chartDataController)

export default router;