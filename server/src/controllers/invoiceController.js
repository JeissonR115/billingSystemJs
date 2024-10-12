import {db} from "../../app.js";

class Invoice {
  static manage = async (req, res, action) => {
    const { invoice_id, customer_id, issue_date, total, status } = req.body;

    try {
      const [rows] = await db.query("CALL invoice(?, ?, ?, ?, ?, ?)", [
        action,
        invoice_id,
        customer_id,
        issue_date,
        total,
        status,
      ]);
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

  static create = async (req, res) => await Invoice.manage(req, res, "Create");

  static read = async (req, res) => {
    req.body.invoice_id = req.params.invoice_id;
    await Invoice.manage(req, res, "Read");
  };

  static update = async (req, res) => await Invoice.manage(req, res, "Update");

  static delete = async (req, res) => {
    req.body.invoice_id = req.params.invoice_id;
    await Invoice.manage(req, res, "Delete");
  };
  static readAll = async (req, res) => {
    try {
      const rows = await db.query("SELECT * FROM Invoices");
      console.log(rows)
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error retrieving invoices:", error);
      res
        .status(500)
        .json({ message: "An error occurred while retrieving invoices." });
    }
  };
}

export default Invoice;
