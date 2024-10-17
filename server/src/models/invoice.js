import { callStoredProcedure } from "../models/StoredProcedure.js";

export const manageInvoice = async (action, params) => {
    try {
        const results = await callStoredProcedure("manage_invoice", [action, ...params]);
        return results;
    } catch (error) {
        throw new Error("Error managing invoices in the database.");
    }
};
