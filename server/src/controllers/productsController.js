import { callStoredProcedure } from "./StoredProcedure.js";

class Products {

  static create = async (req, res) => {
    await callStoredProcedure(req, res, "manage_products", [
      "Create",
      req.body.product_name,
      req.body.description,
      req.body.price,
      req.body.quantity_available,
    ]);
  };

  static read = async (req, res) => {
    await callStoredProcedure(req, res, "manage_products", [
      "Read",
      req.params.product_id,
      null,
      null,
      null,
      null,
    ]);
  };

  static update = async (req, res) => {
    await callStoredProcedure(req, res, "manage_products", [
      "Update",
      req.body.product_id,
      req.body.product_name,
      req.body.description,
      req.body.price,
      req.body.quantity_available,
    ]);
  };

  static delete = async (req, res) => {
    await callStoredProcedure(req, res, "manage_products", [
      "Delete",
      req.params.product_id,
      null,
      null,
      null,
      null,
    ]);
  };

  static readAll = async (req, res) => {
    await callStoredProcedure(req, res, "manage_products", [
      "ReadAll",
      null,
      null,
      null,
      null,
      null,
    ]);
  };
}

export default Products;
