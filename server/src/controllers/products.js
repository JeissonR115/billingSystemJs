import { callStoredProcedure } from "./StoredProcedure.js";

class Products {
  static create = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_products",
      "Create",
      req.body.name,
      req.body.description,
      req.body.price,
      req.body.stock
    );

  static read = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_products",
      "Read",
      req.params.product_id
    );

  static update = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_products",
      "Update",
      req.body.product_id,
      req.body.name,
      req.body.description,
      req.body.price,
      req.body.stock
    );

  static delete = async (req, res) =>
    await callStoredProcedure(
      req,
      res,
      "manage_products",
      "Delete",
      req.params.product_id
    );
}

export default Products;
