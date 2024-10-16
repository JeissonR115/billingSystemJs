import { callStoredProcedure } from "./StoredProcedure.js";

class Invoices {

  static create = async (req, res) => {
    await callStoredProcedure(req, res, "manage_invoice", [
      "Create",
      null, 
      req.body.customer_id,
      req.body.issue_date,
      req.body.status,
    ]);
  };

  static read = async (req, res) => {
    await callStoredProcedure(req, res, "manage_invoice", [
      "Read",
      req.params.invoice_id,
      null,
      null,
      null,
    ]);
    console.log("parametros ---->",req.params)
  };

  static update = async (req, res) => {
    await callStoredProcedure(req, res, "manage_invoice", [
      "Update",
      req.body.invoice_id,
      req.body.customer_id,
      req.body.issue_date,
      req.body.status, // Cambiar 'total' a 'status' ya que no es parte de la gestión de la factura
    ]);
  };

  static delete = async (req, res) => {
    await callStoredProcedure(req, res, "manage_invoice", [
      "Delete",
      req.params.invoice_id,
      null,
      null,
      null, 
    ]);
  };

  static readAll = async (req, res) => {
    await callStoredProcedure(req, res, "manage_invoice", [
      "ReadAll",
      null,
      null,
      null,
      null, 
    ]);
  };
}

export default Invoices;
