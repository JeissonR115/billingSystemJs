import { db } from "../../app.js";

export const callSP = async (procedure, params) => {
    try {
        const placeholders = params.map(() => "?").join(", ");
        const sql = `CALL ${procedure}(${placeholders})`;
        const [results] = await db.query(sql, params);
        return results;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Error occurred while calling the stored procedure.");
    }
};
