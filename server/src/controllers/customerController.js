import { callStoredProcedure } from "./StoredProcedure.js";

class Customers {
  
  static create = async (req, res) => {
    await callStoredProcedure(req, res, "manage_customers", [
      "Create",
      null, 
      req.body.name,
      req.body.address,
      req.body.phone,
      req.body.email,
      req.body.tax_id,
    ]);
  };

  
  static read = async (req, res) => {
    await callStoredProcedure(req, res, "manage_customers", [
      "Read",
      req.params.cust_id,
      null,
      null,
      null,
      null,
    ]);
  };

  
  static update = async (req, res) => {
    await callStoredProcedure(req, res, "manage_customers", [
      "Update",
      req.body.customer_id,
      req.body.name,
      req.body.address,
      req.body.phone,
      req.body.email,
      req.body.tax_id,
    ]);
  };

  
  static delete = async (req, res) => {
    await callStoredProcedure(req, res, "manage_customers", [
      "Delete",
      req.params.cust_id,
      null,
      null,
      null,
      null,
    ]);
  };

  
  static readAll = async (req, res) => {
    await callStoredProcedure(req, res, "manage_customers", [
      "ReadAll",
      null,
      null,
      null,
      null,
      null,
    ]);
  };
}

export default Customers;
