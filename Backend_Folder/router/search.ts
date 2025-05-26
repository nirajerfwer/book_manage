import { Request, Response } from "express";
import { searchBooks } from "../handler/books_handler";

const express = require("express");
const Srouter = express.Router();

Srouter.get("", async (req: Request, res: Response) => {
  const searchterm = req.query.search;
  const result = await searchBooks(searchterm);
  return res.status(200).send({ message: "result found", data: result });
});
export default Srouter;