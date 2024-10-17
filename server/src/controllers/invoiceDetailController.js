import { callSPController } from "./spController.js";

class InvoiceDetails {
  static create = async (req, res) => {
    await callSPController(req, res, "manage_invoice_details", [
      "Create",
      null,
      req.body.invoice_id,
      req.body.product_id,
      req.body.quantity,
      req.body.unit_price,
    ]);
  };


  static read = async (req, res) => {
    await callSPController(req, res, "manage_invoice_details", [
      "Read",
      null,
      req.params.invoice_id,
      null,
      null,
      null,
    ]);

  };

  static update = async (req, res) => {
    await callSPController(req, res, "manage_invoice_details", [
      "Update",
      req.body.detail_id,
      req.body.invoice_id,
      req.body.product_id,
      req.body.quantity,
      req.body.unit_price,
    ]);
  };

  static delete = async (req, res) => {
    await callSPController(req, res, "manage_invoice_details", [
      "Delete",
      req.params.detail_id,
      null,
      null,
      null,
      null,
    ]);
  };

}

export default InvoiceDetails;
