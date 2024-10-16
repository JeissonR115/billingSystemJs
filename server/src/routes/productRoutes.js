import express from "express";
import Products from "../controllers/productsController.js";

const router = express.Router();


router.post("/", Products.create);
router.get("/:product_id", Products.read);
router.get("/", Products.readAll);
router.put("/:product_id", Products.update);
router.delete("/:product_id", Products.delete);

export default router;
