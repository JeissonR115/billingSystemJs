import express from "express";
import invoiceRoutes from "./invoiceRoutes.js";
import invoiceDetailsRoutes from "./invoiceDetailRoute.js";
import productsRoutes from "./productRoutes.js";

// import customerRoutes from "./customerRoutes.js";


const router = express.Router();

router.use("/invoice/details", invoiceDetailsRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/product", productsRoutes)
export default router;
