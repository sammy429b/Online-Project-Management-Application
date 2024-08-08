import { Router } from 'express'
import { registerController, loginController, logoutController } from "../controllers/auth.controller"
const router = Router();

router.get("/auth/logout", logoutController)
router.post("/auth/register", registerController)
router.post("/auth/login", loginController)


export default router;