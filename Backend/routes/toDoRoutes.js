import { Router } from "express";
import { createTodo, deleteTodo, getTodo, singleTodo, updateTodo } from "../controller/toDoController.js";

const router=Router();


router.route("/create").post(createTodo);
router.route("/getAll").get(getTodo);
router.route("/:id").get(singleTodo);
router.route("/update/:id").patch(updateTodo);
router.route("/delete/:id").delete(deleteTodo);


export default router
