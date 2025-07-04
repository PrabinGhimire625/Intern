import { Router } from "express";
import { userLogin, userRegistration } from "../controller/userController.js";

const router=Router();

//post= create/saved to the database
//get= retrieve / fetch from the database
//patch= update 
//delete=


router.route("/register").post(userRegistration);
router.route("/login").post(userLogin);

export default router
