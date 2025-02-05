import express from "express";
import InvoiceDetails from "../controllers/invoiceDetailController.js";

const router = express.Router();

// Create a new invoice detail
router.post("/", InvoiceDetails.create);
router.get("/:invoice_id", InvoiceDetails.read);
router.put("/:detail_id", InvoiceDetails.update);
router.delete("/:detail_id", InvoiceDetails.delete);

export default router;
