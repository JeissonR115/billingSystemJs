// src/controllers/invoiceDetailsController.js
import { db } from "../../app.js";

class InvoiceDetails {
  static manage = async (req, res, action) => {
    const {
      detail_id,
      invoice_id,
      product_id,
      quantity,
      unit_price,
      subtotal,
    } = req.body;

    try {
      const [rows] = await db.query(
        "CALL manage_invoice_details(?, ?, ?, ?, ?, ?)",
        [
          action,
          detail_id,
          invoice_id,
          product_id,
          quantity,
          unit_price,
          subtotal,
        ]
      );
      res
        .status(200)
        .json(action === "Read" ? rows : { message: rows[0][0].message });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  };

  static create = async (req, res) =>
    await InvoiceDetails.manage(req, res, "Create");

  static read = async (req, res) => {
    req.body.detail_id = req.params.detail_id;
    await InvoiceDetails.manage(req, res, "Read");
  };

  static update = async (req, res) =>
    await InvoiceDetails.manage(req, res, "Update");

  static delete = async (req, res) => {
    req.body.detail_id = req.params.detail_id;
    await InvoiceDetails.manage(req, res, "Delete");
  };

  static readAll = async (req, res) => {
    try {
      const rows = await db.query("SELECT * FROM Invoice_Details");
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error retrieving invoice details:", error);
      res
        .status(500)
        .json({
          message: "An error occurred while retrieving invoice details.",
        });
    }
  };
}

export default InvoiceDetails;
