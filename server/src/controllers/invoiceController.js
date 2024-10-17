import { callSPController } from "./spController.js";
import { callSP } from "../models/SP.js";
class Invoices {

  static create = async (req, res) => {
    await callSPController(req, res, "manage_invoice", [
      "Create",
      null,
      req.body.customer_id,
      req.body.issue_date,
      req.body.status,
    ]);
  };

  static read = async (req, res) => {
    await callSPController(req, res, "manage_invoice", [
      "Read",
      req.params.invoice_id,
      null,
      null,
      null,
    ]);
  };

  static update = async (req, res) => {
    await callSPController(req, res, "manage_invoice", [
      "Update",
      req.body.invoice_id,
      req.body.customer_id,
      req.body.issue_date,
      req.body.status,
    ]);
  };

  static delete = async (req, res) => {
    await callSPController(req, res, "manage_invoice", [
      "Delete",
      req.params.invoice_id,
      null,
      null,
      null,
    ]);
  };

  static readAll = async (req, res) => {
    await callSPController(req, res, "manage_invoice", [
      "ReadAll",
      null,
      null,
      null,
      null,
    ]);
  };

  static readWhitDetails = async (req, res) => {
    const invoice = await callSP("manage_invoice", [
      "Read",
      req.params.invoice_id,
      null,
      null,
      null,
    ]);
    const invoiceDetails = await callSP("manage_invoice_details", [
      "Read",
      null,
      req.params.invoice_id,
      null,
      null,
      null,
    ])
    res.status(200).json({ invoice, details: invoiceDetails });
  }
}

export default Invoices;
