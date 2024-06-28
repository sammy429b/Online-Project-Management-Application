import { Router } from 'express'
import { registerController, loginController, logoutController } from "../controllers/auth.controller"
const router = Router();

router.get("/logout", logoutController)
router.post("/register", registerController)
router.post("/login", loginController)


export default router;