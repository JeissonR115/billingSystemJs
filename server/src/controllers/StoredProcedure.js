import { db } from "../../app.js";

export const callStoredProcedure = async (req, res, procedure, params) => {
  try {
    const placeholders = params.map(() => "?").join(", ");
    const sql = `CALL ${procedure}(${placeholders})`;
    const [results] = await db.query(sql, params);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};
