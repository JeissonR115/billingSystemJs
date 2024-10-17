import { callSP } from "../models/SP.js";

export const callSPController = async (_req, res, procedure, params) => {
  try {
    const results = await callSP(procedure, params);
    res.status(200).json(results);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ message: "An error occurred while processing your request." });
  }
};
