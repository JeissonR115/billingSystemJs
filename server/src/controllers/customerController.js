import { callStoredProcedure } from "./StoredProcedure.js";

class Customers {
  static create = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_customers",
      "Create",
      req.body.name,
      req.body.address,
      req.body.phone,
      req.body.email,
      req.body.tax_id
    );

  static read = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_customers",
      "Read",
      req.params.customer_id
    );

  static update = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_customers",
      "Update",
      req.body.customer_id,
      req.body.name,
      req.body.address,
      req.body.phone,
      req.body.email,
      req.body.tax_id
    );

  static delete = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_customers",
      "Delete",
      req.params.customer_id
    );
}

export default Customers;
