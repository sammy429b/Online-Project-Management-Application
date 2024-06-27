import {Router} from 'express'
import { createProjectController, getProjectController } from '../controllers/project.controller';

const router = Router();

router.get("/project-list", getProjectController)
router.post("/create-project", createProjectController)

export default router;