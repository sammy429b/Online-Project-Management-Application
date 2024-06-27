import {Router} from 'express'
import { createProjectController, getProjectController, updateProjectStatusController } from '../controllers/project.controller';

const router = Router();

router.get("/project-list", getProjectController)
router.post("/create-project", createProjectController)
router.put("/update-status", updateProjectStatusController)

export default router;