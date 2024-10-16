import { callStoredProcedure } from "./StoredProcedure.js";
class Payments {
  static create = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_payments",
      "Create",
      req.body.invoice_id,
      req.body.amount,
      req.body.payment_date,
      req.body.method
    );

  static read = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_payments",
      "Read",
      req.params.payment_id
    );

  static update = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_payments",
      "Update",
      req.body.payment_id,
      req.body.invoice_id,
      req.body.amount,
      req.body.payment_date,
      req.body.method
    );

  static delete = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_payments",
      "Delete",
      req.params.payment_id
    );
}

export default Payments;
