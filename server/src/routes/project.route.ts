import {Router} from 'express'
import { createProjectController } from '../controllers/project.controller';

const router = Router();

router.post("/create-project", createProjectController)

export default router;