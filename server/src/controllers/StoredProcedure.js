import { db } from "../../app.js";

export const callStoredProcedure = async (_req, res, procedure, action, ...params) => {
  try {
    const [rows] = await db.query(
      `CALL ${procedure}(?, ${params.map(() => "?").join(", ")})`,
      [action, ...params]
    );

    if (action === "Read" || action === "ReadAll") {
      res.status(200).json(rows);
    } else {
      res.status(200).json({ message: rows[0][0].message });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};
