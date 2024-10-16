import express from "express";
import invoiceRoutes from "./invoiceRoutes.js";
import invoiceDetailsRoutes from "./invoiceDetailRoute.js";
import productsRoutes from "./productRoutes.js";

// import customerRoutes from "./customerRoutes.js";


const router = express.Router();

router.use("/invoice", invoiceRoutes);
router.use("/invoice_detail", invoiceDetailsRoutes);
router.use("/product",productsRoutes)

export default router;
