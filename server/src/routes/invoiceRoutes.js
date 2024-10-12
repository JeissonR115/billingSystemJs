import express from "express";
import Invoice from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/", Invoice.create); 
router.get("/:invoice_id", Invoice.read); 
router.get('/',Invoice.readAll)
router.put("/", Invoice.update); 
router.delete("/:invoice_id", Invoice.delete); 


export default router;
    