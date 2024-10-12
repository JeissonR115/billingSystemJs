import express from "express";
import invoiceRoutes from "./invoiceRoutes.js";
import invoiceDetailsRoutes from "./invoiceDetailRoute.js";
// import customerRoutes from "./customerRoutes.js";


const router = express.Router();

router.use("/invoice_details", invoiceDetailsRoutes);
router.use("/invoice", invoiceRoutes);


export default router;
