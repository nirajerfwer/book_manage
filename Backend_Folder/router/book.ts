import { Request, Response } from "express";
import {
  addreviews,
  createBook,
  getBook,
  getBookById,
} from "../handler/books_handler";
import ReviewsModel from "../db/reviews";

const exportb = require("express");
const multer = require("multer");

const mymulter = multer();

const Brouter = exportb.Router();

Brouter.post("", mymulter.none(), async (req: Request, res: Response) => {
  try {
    const book = await createBook(req.body);
    return res.status(200).send({ message: "book created", data: book });
  } catch (err) {
    console.log("error while creating book", err);
    return res.status(500).send({ message: "error while creating book" });
  }
});

Brouter.get("", mymulter.none(), async (req: Request, res: Response) => {
  try {
    const skip = req.query.page || 0;
    const limit = req.query.limit || 10;
    const author = req.query.author || null;
    const genre = req.query.genre || null;
    const books = await getBook(skip, limit, author, genre);
    return res.status(200).send({ message: "book found", data: books });
  } catch (err) {
    console.log("error while creating book", err);
    return res.status(500).send({ message: "error while creating book" });
  }
});

Brouter.get("/:id", mymulter.none(), async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    const bookbyid = await getBookById(id, page, limit);
    return res.status(200).send(bookbyid);
  } catch (err) {
    console.log("error while getting book", err);
    return res.status(500).send({ message: "error while getting book" });
  }
});
Brouter.post(
  "/:id/reviews",
  mymulter.none(),
  async (req: Request, res: Response) => {
    try {
      const bookid = req.params.id;
      const bodyreviews = req.body;
      const review = await addreviews(bookid, bodyreviews);
      return res.status(200).send(review);
    } catch (err) {
      console.log("error while creating book", err);
      return res.status(500).send({ message: "error while creating book" });
    }
  }
);

export default Brouter;
