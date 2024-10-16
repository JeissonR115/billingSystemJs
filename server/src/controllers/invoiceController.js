import { callStoredProcedure } from "./StoredProcedure.js";

class Invoices {
  static create = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_invoice",
      "Create",
      req.body.customer_id,
      req.body.issue_date,
      req.body.total,
      req.body.status
    );

  static read = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_invoice",
      "Read",
      req.params.invoice_id
    );

  static update = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_invoice",
      "Update",
      req.body.invoice_id,
      req.body.customer_id,
      req.body.issue_date,
      req.body.total,
      req.body.status
    );

  static delete = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_invoice",
      "Delete",
      req.params.invoice_id
    );

  static readAll = async (req, res) =>
    await callStoredProcedure(req, res, "manage_invoice", "ReadAll");
}

export default Invoices;
